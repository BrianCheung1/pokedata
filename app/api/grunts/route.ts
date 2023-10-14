import axios from "axios"
import { NextResponse } from "next/server"
import { setupCache } from "axios-cache-interceptor"


export async function GET(req: Request) {
  try {
    const grunts = await axios.get(
      "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/grunts.json"
    )

    const gruntsActive = Object.values(grunts.data).filter((grunt: any) => {
      return grunt.active
    })

    return NextResponse.json(
      {
        msg: "Success",
        grunts: gruntsActive,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Error in Grunts GET", error },
      { status: 500 }
    )
  }
}
