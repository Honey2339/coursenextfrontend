"use client"
import Script from "next/script"
import { useEffect, useState, useContext } from "react"
import { Button, Card, CardContent, Typography, Grid } from "@mui/material"
import Loading from "./loading"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

function CourseCard({ setShowMsg }) {
  const [showCard, setShowCard] = useState(false)
  const [userCourse, setUserCourse] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [allCourses, setAllCourses] = useState([])

  const router = useRouter()

  useEffect(() => {
    const getAllCourses = async () => {
      await axios
        .get("https://coursenextbackend-production.up.railway.app/allcourses", {
          withCredentials: true,
        })
        .then((res) => {
          setAllCourses(res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getAllCourses()
  }, [])

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const username = Cookies.get("username")
        const res = await axios.get(
          "https://coursenextbackend-production.up.railway.app/userCourses",
          {
            withCredentials: true,
          }
        )
        setUserCourse(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleBuy = (course) => {
    const user = Cookies.get("username")
    const id = course.id
    const res = axios
      .post(`https://coursenextbackend-production.up.railway.app/purCourse`, {
        id,
        user,
      })
      .then((res) => {
        console.log(res.data)
        setShowMsg(true)
        setSelectedCourse(course)
      })
      .then((res2) => {
        setTimeout(() => {
          setShowMsg(false)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="mt-10 grid grid-cols-4 ml-32">
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
                    <p className="text-red-500 mb-4">Rs:{course.price}</p>
                    {userCourse.some(
                      (userCourse) => userCourse.courseId === course.id
                    ) ? (
                      <Button
                        variant="contained"
                        className="text-white font-meduim bg-purple-800 hover:bg-purple-600 hover:font-semibold"
                        onClick={() => router.push("/mycourses")}
                      >
                        Go To Course
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="text-white font-meduim bg-purple-800 hover:bg-purple-600 hover:font-semibold"
                        onClick={() => handleBuy(course)}
                      >
                        Buy Course
                      </Button>
                    )}
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

export default CourseCard
