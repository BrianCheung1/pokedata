import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: Request,
  { params }: { params: { pokemon_name: string } }
) {
  const pokemon_name = params.pokemon_name
  try {
    const type_weakness_data = await findDualTypeDoubleDmgFrom(pokemon_name)
    const type_effectiveness_data = await findDualTypeDoubleDmgTo(pokemon_name)
    const pokemon_details = await getPokemonDetails(pokemon_name)
    const pokemon_types = await getPokemonTypes(pokemon_details)
    return NextResponse.json(
      {
        msg: "Success",
        pokemon_name: pokemon_name,
        pokemon_types: pokemon_types,
        type_effectiveness: type_effectiveness_data,
        type_weakness: type_weakness_data,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon_details.id}.svg`,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

async function getPokemonDetails(pokemonName: string) {
  const response = await axios(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  )
  // const data = await response.json()
  return response.data
}

async function getTypeDoubleDmgFrom(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_from.map(
    (type: { name: any }) => type.name
  )
}

async function getTypeHalfDmgFrom(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.half_damage_from.map(
    (type: { name: any }) => type.name
  )
}

async function getTypeDoubleDmgTo(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: any }) => type.name
  )
}

async function getTypeHalfDmgTo(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: any }) => type.name
  )
}

function getPokemonTypes(pokemon: { types: { type: { name: any } }[] }) {
  return pokemon.types.map((type: { type: { name: any } }) => type.type.name)
}

async function findDualTypeDoubleDmgFrom(pokemonName: string) {
  try {
    const pokemonDetails = await getPokemonDetails(pokemonName)
    const pokemonTypes = await getPokemonTypes(pokemonDetails)

    // Assuming a Pokemon can have two types
    if (pokemonTypes.length === 2) {
      const [type1, type2] = pokemonTypes
      const doubleDamageFrom1 = await getTypeDoubleDmgFrom(type1)
      const doubleDamageFrom2 = await getTypeDoubleDmgFrom(type2)

      const halfDamageFrom1 = await getTypeHalfDmgFrom(type1)
      const halfDamageFrom2 = await getTypeHalfDmgFrom(type2)

      const dualTypeWeakness = [
        ...doubleDamageFrom1,
        ...doubleDamageFrom2,
      ].filter((val) => 
        !halfDamageFrom1.includes(val) && !halfDamageFrom2.includes(val)
      )

      return Array.from(new Set(dualTypeWeakness))
    } else {
      const [type] = pokemonTypes
      const doubleDamageFrom = await getTypeDoubleDmgFrom(type)
      return doubleDamageFrom
    }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

async function findDualTypeDoubleDmgTo(pokemonName: string) {
  try {
    const pokemonDetails = await getPokemonDetails(pokemonName)
    const pokemonTypes = await getPokemonTypes(pokemonDetails)

    // Assuming a Pokemon can have two types
    if (pokemonTypes.length === 2) {
      const [type1, type2] = pokemonTypes
      const doubleDmgTo1 = await getTypeDoubleDmgTo(type1)
      const doubleDmgTo2 = await getTypeDoubleDmgTo(type2)

      const doubleDmgObject = {
        [type1]: doubleDmgTo1,
        [type2]: doubleDmgTo2,
      }

      return doubleDmgObject
    } else {
      const [type] = pokemonTypes
      const effectivenessType = await getTypeDoubleDmgTo(type)
      return effectivenessType
    }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
