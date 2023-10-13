import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    let pokemons = await axios.get(
      "https://pogoapi.net/api/v1/pokemon_types.json"
    )

    pokemons = pokemons.data.filter((pokemon: { form: string })=> {
      return pokemon.form === "Normal"
    })
    return NextResponse.json(
      {
        msg: "Success",
        pokemons: pokemons,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: "Error in Pokemons GET", error }, { status: 500 })
  }
}
