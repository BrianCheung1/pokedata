import axios from "axios"
import { NextResponse } from "next/server"


//returns a list of released pokemons in pokemon go
//filters by normal type as there are multiple forms
export async function GET(req: Request) {
  try {
    const [pokemons, released_pokemons] = await Promise.all([
      axios.get("https://pogoapi.net/api/v1/pokemon_types.json"),
      axios.get("https://pogoapi.net/api/v1/released_pokemon.json"),
    ])

    const normalForms = pokemons.data.filter(
      (pokemon: { form: string }) => pokemon.form === "Normal"
    )
    const uniquePokemonIds = new Set()

    const filteredPokemon = pokemons.data.filter(
      (pokemon: { pokemon_id: number; form: string }) => {
        const hasNormalForm = normalForms.find(
          (normalPokemon: { pokemon_id: number }) =>
            normalPokemon.pokemon_id === pokemon.pokemon_id
        )

        const released = released_pokemons.data.hasOwnProperty(
          pokemon.pokemon_id
        )

        if (hasNormalForm) {
          return pokemon.form === "Normal" && released
        } else {
          if (uniquePokemonIds.has(pokemon.pokemon_id)) {
            return
          }
          uniquePokemonIds.add(pokemon.pokemon_id)
          return released
        }
      }
    )
    // Missing 25 pokemons
    // Smoliv #928, Dolliv #929, and Arboliva #930
    // Skiddo #672 and Gogoat #673
    // Nymble #919 and Lokix #920
    // Pawmi #921, Pawmo #922, and Pawmot #923
    // Bombirdier #962
    // Frigibax #996, Arctibax #997, and Baxcalibur #998
    // Sprigatito #906, Floragato #907, and Meowscarada #908
    // Fuecoco #909, Crocalor #910, and Skeledirge #911
    // Quaxly #912, Quaxwell #913, and Quaquaval #914
    // Lechonk #915 and Oinkologne #916
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
