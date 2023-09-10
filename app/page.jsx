import { Button, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import teacher from "./images/teache.png"
import kids from "./images/4kids.png"

export default function Home() {
  return (
    <div className="flex">
      <main className="mt-56 ml-20">
        <div className="flex gap-4">
          <h1 className="text-purple-400 text-5xl font-bold flex gap-3 mb-4">
            Unleash
          </h1>
          <h1 className="text-white text-5xl font-bold flex gap-3 mb-4">
            Your
          </h1>
        </div>
        <div className="flex gap-4">
          <h1 className="text-white text-5xl font-bold flex gap-3">
            Potential
          </h1>
          <h1 className="text-purple-400 text-5xl font-bold flex gap-3 mb-4">
            Today.
          </h1>
        </div>
        <div className="max-w-xl mt-5">
          <p className="text-white font-medium text-lg">
            Upskill yourself today with various topics to choose from!. From
            full stack to web3 development we provide top-notch courses.
          </p>
        </div>
        <div className="mt-9 flex gap-20">
          <Button
            variant="contained"
            className="login bg-purple-400 text-white font-semibold hover:bg-white px-5 hover:text-black"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            variant="contained"
            className="login bg-purple-400 text-white font-semibold hover:bg-white px-5 hover:text-black"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </main>
      <Image
        className="mt-36"
        style={{ marginLeft: "500px" }}
        src={teacher}
      ></Image>
    </div>
  )
}
