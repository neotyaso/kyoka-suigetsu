import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'
import path from 'path'


const prisma = new PrismaClient() 



const app = new Hono()


app.use('/*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))
//お知らせを削除する窓口
app.delete('/api/admin/news/:id', async (c) => {
  try {
    // URLの末尾についたID（例: /api/admin/news/3 なら 3）を取得
    const id = Number(c.req.param('id'))

    // Prismaを使ってデータベースから該当のレコードを削除
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

// ✅ お問い合わせを「対応済み」に更新する窓口
// ✅ お問い合わせの「対応 / 未対応」を切り替える窓口（トグル化）
app.put('/api/admin/contacts/:id/read', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    
    // 1. 現在のデータを取得
    const existingContact = await prisma.contact.findUnique({ where: { id: id } })
    if (!existingContact) return c.json({ error: '対象が見つかりません' }, 404)

    let nextCreatedAt = existingContact.createdAt

    // 2. 「,DONE」が付いていたら消す、無ければ付ける
    if (nextCreatedAt.includes(',DONE')) {
      nextCreatedAt = nextCreatedAt.replace(',DONE', '') // 未対応に戻す
      console.log(`お問い合わせ(ID: ${id})を【未対応】に戻しました`)
    } else {
      nextCreatedAt = `${nextCreatedAt},DONE` // 対応済みにする
      console.log(`お問い合わせ(ID: ${id})を【対応済み】にしました`)
    }

    // 3. データベースを更新
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

//お知らせを編集（更新）する窓口
app.put('/api/admin/news/:id', async (c) => {
  try {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()

    // Prismaを使ってデータベースの中身を書き換える
    const updatedNews = await prisma.news.update({
      where: { id: id },
      data: {
        title: body.title,
        content: body.content,
        // 日付は更新した日のものにするか、元のままにするか選べますが、今回は更新日に上書きします
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

// 🔍 届いたお問い合わせを一覧で取得する（新しい順）
app.get('/api/admin/contacts', async (c) => {
  try {
    // 💡 余計な引数は一切なし！Prisma 6の正しい全件取得の書き方です
    const contacts = await prisma.contact.findMany({
      orderBy: {
        id: 'desc', // 新しい順に並べる
      },
    })
    return c.json(contacts)
  } catch (error) {
    console.error("お問い合わせ取得エラー:", error)
    return c.json({ error: 'お問い合わせ一覧の取得に失敗しました' }, 500)
  }
})

// 📢 お知らせ一覧（最新の配列を返すように修正）
app.get('/api/admin/news', async (c) => {
  try {
    // 💡 本物のデータベースからデータを取ってくる魔法の処理
    const newsList = await prisma.news.findMany({
      orderBy: {
        id: 'desc', // 新しい順に並べる
      },
    })
    return c.json(newsList)
  } catch (error) {
    return c.json({ error: 'お知らせの取得に失敗しました' }, 500)
  }
})

// 🚀 新しくお知らせを投稿する窓口（追加）
app.post('/api/admin/news', async (c) => {
  const body = await c.req.json()
  
  const newPost = await prisma.news.create({
    data: {
      title: body.title,
      content: body.content,
      date: new Date().toISOString().split('T')[0]
    }
  })

  console.log('新しくお知らせが布告されました:', newPost)
  return c.json({ success: true, news: newPost })
})

// お問い合わせ送信窓口
// 📥 お問い合わせを受け付ける窓口（データベースへ保存）
app.post('/api/contacts', async (c) => {
  try {
    const body = await c.req.json()

    // 💡 Prismaを使って SQLite の Contact テーブルに保存します
    const newContact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        createdAt: new Date().toISOString(), // 送信された日時
      },
    })

    console.log('データベースにお問い合わせが記録されました:', newContact)
    return c.json({ success: true, contact: newContact })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'お問い合わせの送信に失敗しました' }, 500)
  }
})

// 💡 一般ユーザーが使う、お城AIチャットの中継窓口
app.post('/api/castle-chat', async (c) => {
  try {
    const { message } = await c.req.json()

    // Pythonのチャット窓口へ横流し
    const pythonResponse = await fetch('http://127.0.0.1:5000/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })

    if (!pythonResponse.ok) {
      return c.json({ error: 'AI案内人が居眠りしているようです' }, 500)
    }

    const result = await pythonResponse.json()
    return c.json(result) // { reply: "..." } が返る

  } catch (error) {
    console.error('Chat Error:', error)
    return c.json({ error: '通信に失敗しました' }, 500)
  }
})

const port = 8000
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })