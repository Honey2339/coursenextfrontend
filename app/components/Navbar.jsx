"use client"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@mui/material"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import buying from "../images/buying.png"
import Image from "next/image"

function Navbar() {
  const pathname = usePathname()

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setUser(Cookies.get("username"))
    setToken(Cookies.get("token"))
  }, [pathname])

  console.log(Cookies.get("username"))

  const handleSignOut = (e) => {
    Cookies.remove("username")
    Cookies.remove("token")
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
  return (
    <Card elevation={2}>
      <CardContent className="p-3 bg-gray-800">
        <header className="body-font mt-2 text-white ">
          <div className="container gap-9 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <Link
              href="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="learnify ml-3 text-purple-400 font-bold text-3xl">
                Learnify
              </span>
            </Link>
            <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 font-semibold	flex flex-wrap items-center text-base justify-center cursor-pointer">
              <Link href="/" className="mr-5 hover:text-purple-500">
                Home
              </Link>
              <Link href="/courses" className="mr-5 hover:text-purple-500">
                Courses
              </Link>
            </div>
            {user && user ? (
              <div className="flex justify-center items-center gap-5">
                <h1>Hello , {user}</h1>
                <Link href="/mycourses">
                  <Image className="h-13 w-14" src={buying}></Image>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center bg-purple-500 border-0 py-2 px-3 focus:outline-none transition duration-200 hover:bg-white hover:text-black rounded text-base font-semibold mt-4 md:mt-0"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button className="inline-flex items-center bg-purple-500 border-0 py-2 px-3 focus:outline-none transition duration-200 hover:bg-white hover:text-black rounded text-base font-semibold mt-4 md:mt-0">
                <Link href="/login">Login</Link>
              </button>
            )}
          </div>
        </header>
      </CardContent>
    </Card>
  )
}

export default Navbar
