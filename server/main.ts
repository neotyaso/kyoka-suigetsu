import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() 
const app = new Hono()

app.use('/*', cors({
  origin: (origin) => {
    if (!origin || origin === 'http://localhost:3000' || origin.includes('kyoka-suigetsu')) {
      return origin
    }
    return 'http://localhost:3000' 
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))


app.delete('/api/admin/news/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'))

    await prisma.news.delete({
      where: { id: id },
    })

    console.log(`お知らせ(ID: ${id})が削除されました`)
    return c.json({ success: true, message: '削除しました' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'お知らせの削除に失敗しました' }, 500)
  }
})

app.put('/api/admin/contacts/:id/read', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    
    const existingContact = await prisma.contact.findUnique({ where: { id: id } })
    if (!existingContact) return c.json({ error: '対象が見つかりません' }, 404)

    let nextCreatedAt = existingContact.createdAt

    if (nextCreatedAt.includes(',DONE')) {
      nextCreatedAt = nextCreatedAt.replace(',DONE', '')
      console.log(`お問い合わせ(ID: ${id})を【未対応】に戻しました`)
    } else {
      nextCreatedAt = `${nextCreatedAt},DONE` 
      console.log(`お問い合わせ(ID: ${id})を【対応済み】にしました`)
    }

    const updatedContact = await prisma.contact.update({
      where: { id: id },
      data: { createdAt: nextCreatedAt }
    })

    return c.json({ success: true, contact: updatedContact })
  } catch (error) {
    console.error(error)
    return c.json({ error: '更新失敗' }, 500)
  }
})

app.put('/api/admin/news/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()

    const updatedNews = await prisma.news.update({
      where: { id: id },
      data: {
        title: body.title,
        content: body.content,
        date: new Date().toISOString().split('T')[0]
      },
    })

    console.log(`お知らせ(ID: ${id})が更新されました:`, updatedNews)
    return c.json({ success: true, news: updatedNews })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'お知らせの更新に失敗しました' }, 500)
  }
})

app.get('/api/admin/contacts', async (c) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { id: 'desc' },
    })
    return c.json(contacts)
  } catch (error) {
    console.error("お問い合わせ取得エラー:", error)
    return c.json({ error: 'お問い合わせ一覧の取得に失敗しました' }, 500)
  }
})

app.get('/api/admin/news', async (c) => {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: { id: 'desc' },
    })
    return c.json(newsList)
  } catch (error) {
    return c.json({ error: 'お知らせの取得に失敗しました' }, 500)
  }
})

//新しいお知らせを投稿
app.post('/api/admin/news', async (c) => {
  const body = await c.req.json()
  
  const newPost = await prisma.news.create({
    data: {
      title: body.title,
      content: body.content,
      date: new Date().toISOString().split('T')[0]
    }
  })

  console.log('新しくお知らせが投稿されました:', newPost)
  return c.json({ success: true, news: newPost })
})

app.post('/api/contacts', async (c) => {
  try {
    const body = await c.req.json()

    const newContact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        createdAt: new Date().toISOString(), 
      },
    })

    console.log('データベースにお問い合わせが記録されました:', newContact)
    return c.json({ success: true, contact: newContact })
  } catch (error) {
    console.error('お問い合わせ送信エラー:', error)
    return c.json({ error: 'お問い合わせの送信に失敗しました', details: error.message }, 500)
  }
})

app.post('/api/castle-chat', async (c) => {
  try {
    const { message } = await c.req.json()

    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://127.0.0.1:8080'

    const pythonResponse = await fetch(`${pythonApiUrl}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })

    if (!pythonResponse.ok) {
      return c.json({ error: 'AI案内人が居眠りしているようです' }, 500)
    }

    const result = await pythonResponse.json()
    return c.json(result)
  } catch (error) {
    console.error('Chat Error:', error)
    return c.json({ error: '通信に失敗しました' }, 500)
  }
})

const port = Number(process.env.PORT) || 8000
console.log(`Server is running on port ${port}`)

serve({ fetch: app.fetch, port })