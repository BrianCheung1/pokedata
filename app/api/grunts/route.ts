import axios, { AxiosResponse } from "axios"
import { NextResponse } from "next/server"
import gruntsData from "@/libs/grunts.json"

const POKEAPI = "https://pokeapi.co/api/v2"

//returns a list of team rocket names and lineups
//filter for regular grunts and leaders
export async function GET(req: Request) {
  try {
    const gruntsResponse = gruntsData
    //filter for grunts
    const gruntsActive = Object.values(gruntsResponse).filter(
      (grunt) => grunt.active && !grunt.character.boss
    )
    //filter for leaders
    const executiveActive = Object.values(gruntsResponse).filter(
      (grunt) => grunt.active && grunt.character.boss
    )

    const executiveSorted = executiveActive.sort((a, b) => {
      // Custom sorting logic
      if (a.character.template === "CHARACTER_GIOVANNI") {
        return -1 // "CHARACTER_GIOVANNI" comes first
      } else {
        // For other characters, use the default sorting order
        return a.character.template.localeCompare(b.character.template)
      }
    })
    const [gruntLineUpDetails, executiveLineUpDetails] = await Promise.all([
      getLineUpDetails(gruntsActive),
      getLineUpDetails(executiveSorted),
    ])

    return NextResponse.json(
      {
        msg: "Success",
        grunts: gruntLineUpDetails,
        executive: executiveLineUpDetails,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: "Error in Grunts GET" }, { status: 500 })
  }
}

async function getPokemonDetails(pokemonTeams: string[][]) {
  const flattenTeams: string[] = pokemonTeams.flat() // Flatten the nested array

  try {
    const pokemonDetails = await Promise.all(
      flattenTeams.map(async (pokemonName) => {
        const response = await axios.get(`${POKEAPI}/pokemon/${pokemonName}`)
        return {
          id: response.data.id,
          name: response.data.name,
          sprite:
            response.data.sprites.other.home.front_default ||
            response.data.sprites.other["official-artwork"].front_default,
        }
      })
    )

    // Rearrange the results back into the original structure
    return pokemonTeams.map((team) => team.map(() => pokemonDetails.shift()))
  } catch (error) {
    console.error("Error fetching Pokémon details:", error)
    // Handle error, you may return an empty array or some default data
    return []
  }
}

async function getLineUpDetails(gruntList: any) {
  return await Promise.all(
    gruntList.map(async (grunt: any) => {
      const gruntTeams = grunt.lineup.team.map((team: any) =>
        team.map((pokemon: { id: string }) => pokemon.id)
      )

      const pokemonDetails = await getPokemonDetails(gruntTeams)

      return {
        name: grunt.character.template,
        team: pokemonDetails,
        type: grunt.character.type.name,
        quotes: grunt.character.quotes,
      }
    })
  )
}
