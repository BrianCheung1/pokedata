import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    let pokemons = await axios.get(
      "https://pogoapi.net/api/v1/pokemon_types.json"
    )

    const filteredPokemon = pokemons.data.filter(
      (pokemon: { pokemon_id: any; form: string }) => {
        const hasNormalForm = pokemons.data.some(
          (otherPokemon: { pokemon_id: any; form: string }) =>
            otherPokemon.pokemon_id === pokemon.pokemon_id &&
            otherPokemon.form === "Normal"
        )

        return pokemon.form === "Normal" || !hasNormalForm
      }
    )
    return NextResponse.json(
      {
        msg: "Success",
        pokemons: filteredPokemon,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Error in Pokemons GET", error },
      { status: 500 }
    )
  }
}
