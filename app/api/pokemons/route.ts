import axios from "axios"
import { NextResponse } from "next/server"
export async function GET(req: Request) {
  try {
    const pokemons = await axios.get(
      "https://pogoapi.net//api/v1/released_pokemon.json"
    )
    return NextResponse.json(
      {
        msg: "Success",
        pokemons: Object.values(pokemons.data),
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
