"use client"
import React, { useEffect, useState } from "react"
import CourseCard from "./CourseCard"
import Loading from "./loading"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

function Courses() {
  const [showmsg, setShowMsg] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = Cookies.get("username")
    const token = Cookies.get("token")
    if (user && token) {
      console.log("Found")
    } else {
      router.push("/login")
    }
  }, [])

  return (
    <section className="">
      <div className="flex justify-center  mt-20">
        <h1 className="text-white font-semibold underline text-2xl">
          All Courses
        </h1>
      </div>
      <div className="flex justify-center text-green-400 font-medium mt-2">
        <h1>{showmsg ? <p>You Purchased the Course</p> : null}</h1>
      </div>
      <CourseCard setShowMsg={setShowMsg} />
    </section>
  )
}

export default Courses
