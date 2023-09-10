import Navbar from "./components/Navbar"
import "./globals.css"
import { Inter } from "next/font/google"
import { createContext, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Learnify",
  description: "",
}

export const AuthContext = createContext()

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Navbar />
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  )
}
