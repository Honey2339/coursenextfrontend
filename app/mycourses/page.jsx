"use client"

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loading from "./loading"
import { Button, Card, CardContent, Typography, Grid } from "@mui/material"

function MyCourses() {
  const router = useRouter()

  const [showCard, setShowCard] = useState(false)
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    const user = Cookies.get("username")
    const token = Cookies.get("token")
    if (user && token) {
      const res = axios
        .get(
          "https://coursenextbackend-production.up.railway.app/userCourses",
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data)
          setAllCourses(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mt-20 grid grid-cols-4 ml-32">
      {allCourses &&
        allCourses.map((course) => (
          <div key={course.id}>
            {showCard ? (
              <>
                <Card
                  className="rounded-xl"
                  sx={{
                    maxWidth: "300px",
                    mt: "20px",
                    transition: "box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0px 20px 20px rgba(255,255,255, 0.3)",
                    },
                  }}
                  elevation={2}
                >
                  <CardContent className="p-0 bg-white flex flex-col items-center">
                    <img className="max-h-60" src={course.url} alt="Course" />
                    <h1 className="font-meduim mt-9 text-lg text-gray-700">
                      {course.title}
                    </h1>
                    <p
                      className="mt-2 mb-4 text-center"
                      sx={{ maxWidth: "250px" }}
                    >
                      {course.description}
                    </p>
                    <Button
                      variant="contained"
                      className="text-white font-meduim bg-purple-800 hover:bg-purple-600 hover:font-semibold"
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex justify-center mt-40 text-white">
                <Loading />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default MyCourses
