import axios from "axios"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const [pokemons, released_pokemons] = await Promise.all([
      axios.get("https://pogoapi.net/api/v1/pokemon_types.json"),
      axios.get("https://pogoapi.net/api/v1/released_pokemon.json"),
    ]);

    const normalForms = pokemons.data.filter((pokemon:{form:string}) => pokemon.form === "Normal")

    const filteredPokemon = pokemons.data.filter(
      (pokemon: { pokemon_id: any; form: string }) => {
        const hasNormalForm = normalForms.some(
          (otherPokemon: { pokemon_id: any; form: string }) =>
            otherPokemon.pokemon_id === pokemon.pokemon_id
        )
        const released = released_pokemons.data[pokemon.pokemon_id];

        return pokemon.form === ("Normal" || !hasNormalForm) && released
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
