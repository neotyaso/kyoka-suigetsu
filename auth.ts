import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL
      
      if (user.email === adminEmail) {
        return true 
      }
      return false 
    },
  },
})