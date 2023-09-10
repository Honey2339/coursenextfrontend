"use client"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Image from "next/image"
import { useRouter } from "next/navigation"
import lock from "../images/lock.png"
import "./login.css"
import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const res = axios
      .post("https://coursenextbackend-production.up.railway.app/user/login", {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.token
        const username = res.data.username
        Cookies.set("username", username, { expires: 0.1 })
        Cookies.set("token", token, { expires: 0.1 })
        setUsername("")
        setPassword("")
        setTimeout(() => {
          router.push("/courses")
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="flex">
      <Image src={lock} className="h-96 w-80 mt-52 ml-72"></Image>
      <Container component="main" maxWidth="xs">
        <Box
          className="rounded-lg bg-gray-850 shadow-2xl"
          sx={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            border: "2px solid white",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            className="text-white font-bold"
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className="border-purple"
              margin="normal"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "gray" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              color="secondary"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              type="password"
              autoComplete="current-password"
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "gray" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="bg-blue-600"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}
