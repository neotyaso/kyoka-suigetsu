import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // 💡 ここを環境変数ではなく、SQLiteのファイルパス直接指定に書き換えます
  datasource: {
    url: "file:./prisma/dev.db",
  },
});