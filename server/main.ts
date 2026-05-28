import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use("/*", cors({
    origin: "https://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

app.get("/", (c) => {
    return c.text("Hello 鏡花水月城")
})

app.post("/api/contact", async (c) => {
    const body = await c.req.json()
    
})