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

// 💡 データベースの代わりに、サーバーのメモリ上でお知らせを管理します
let dummyNews = [
  { id: 2, title: '初夏の特別夜間開城について', content: '6月1日より夜間ライトアップを行います。', date: '2026-05-20' },
  { id: 1, title: '公式ホームページを開設しました', content: '鏡花水月城のWebサイトへようこそ。', date: '2026-05-01' },
]

let dummyContacts = [
  { id: 2, name: '豊臣 秀吉', email: 'hideyoshi@example.com', message: '黄金の茶室は持ち込み可能ですか？', createdAt: '2026-05-29' },
  { id: 1, name: '織田 信長', email: 'nobunaga@example.com', message: '鏡花水月城の天守閣の見学時間を教えてほしい。', createdAt: '2026-05-28' },
]

// お問い合わせ一覧（変更なし）
app.get('/api/admin/contacts', (c) => {
  return c.json(dummyContacts)
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
app.post('/api/contact', async (c) => {
  const body = await c.req.json()
  const newContact = {
    id: dummyContacts.length + 1,
    name: body.name,
    email: body.email,
    message: body.message,
    createdAt: new Date().toISOString().split('T')[0]
  }
  dummyContacts = [newContact, ...dummyContacts]
  return c.json({ success: true })
})

const port = 8000
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })