import { NextResponse } from "next/server"
import Axios from "axios"
import { capitalize } from "@/libs/utils"
import { setupCache } from "axios-cache-interceptor"

const axios = setupCache(Axios)

export async function GET(
  req: Request,
  { params }: { params: { pokemon_name: string } }
) {
  const pokemon_name = params.pokemon_name.toLowerCase()
  try {
    // const type_vulnerable = await findDualTypeDoubleDmgFrom(pokemon_name)
    // const type_effectiveness = await findDualTypeDoubleDmgTo(pokemon_name)
    const pokemon_details = await getPokemonDetails(pokemon_name)
    // const pokemon_types = await getPokemonTypes(pokemon_details)
    // const type_resistant = await findDualTypeHalfDmgFrom(pokemon_name)
    // const pokemon_stats = await getPokemonStats(pokemon_name)
    // const pokemon_flavor_text = await findFlavorText(pokemon_name)
    // const shiny = await getShiny(pokemon_name)
    // const pokemon_weather_boosted = await findPokemonBoosted(pokemon_name)
    // const buddy_distance = await findPokemonBuddy(pokemon_name)

    const [
      type_vulnerable,
      type_effectiveness,
      pokemon_types,
      type_resistant,
      pokemon_stats,
      pokemon_flavor_text,
      shiny,
      pokemon_weather_boosted,
      buddy_distance,
    ] = await Promise.all([
      findDualTypeDoubleDmgFrom(pokemon_name),
      findDualTypeDoubleDmgTo(pokemon_name),
      getPokemonTypes(pokemon_details),
      findDualTypeHalfDmgFrom(pokemon_name),
      getPokemonStats(pokemon_name),
      findFlavorText(pokemon_name),
      getShiny(pokemon_name),
      findPokemonBoosted(pokemon_name),
      findPokemonBuddy(pokemon_name),
    ])

    return NextResponse.json(
      {
        msg: "Success",
        pokemon_name: pokemon_name,
        pokemon_types: pokemon_types,
        type_effectiveness: type_effectiveness,
        type_vulnerable: type_vulnerable,
        type_resistant: type_resistant,
        shiny: shiny,
        pokemon_stats: pokemon_stats,
        pokemon_flavor_text: pokemon_flavor_text,
        pokemon_weather_boosted: pokemon_weather_boosted,
        buddy_distance: buddy_distance,
        sprite: `https://img.pokemondb.net/sprites/go/normal/${pokemon_name}.png`,
        sprite_shiny: `https://img.pokemondb.net/sprites/go/shiny/${pokemon_name}.png`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

async function getPokemonDetails(pokemonName: string) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  )
  return response.data
}

async function getFlavorTextEntries(pokemonName: string) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
  )
  return response.data
}

async function getTypeDoubleDmgFrom(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

async function getTypeHalfDmgFrom(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.half_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

async function getTypeDoubleDmgTo(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: string }) => type.name
  )
}

async function getTypeHalfDmgTo(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: string }) => type.name
  )
}

async function getNoDmgFrom(typeName: string) {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
  // const data = await response.json()
  return response.data.damage_relations.no_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

function getPokemonTypes(pokemon: { types: { type: { name: string } }[] }) {
  return pokemon.types.map((type: { type: { name: string } }) => type.type.name)
}

async function getShiny(pokemon_name: string) {
  const response = await axios.get(
    `https://pogoapi.net/api/v1/shiny_pokemon.json`
  )
  const pokemon_details = await getPokemonDetails(pokemon_name)
  return response.data[Number(pokemon_details.id)]
}

async function getPokemonStats(pokemon_name: string) {
  const response = await axios.get(
    `https://pogoapi.net/api/v1/pokemon_stats.json`
  )
  const response2 = await axios.get(
    `https://pogoapi.net/api/v1/pokemon_max_cp.json`
  )
  let stats = response.data.find(
    (pokemon: { pokemon_name: string; form: string }) =>
      pokemon.pokemon_name.toLowerCase() === pokemon_name &&
      pokemon.form === "Normal"
  )
  stats.max_cp = response2.data.find(
    (pokemon: { pokemon_name: string; form: string }) =>
      pokemon.pokemon_name.toLowerCase() === pokemon_name &&
      pokemon.form === "Normal"
  ).max_cp
  return stats
}

async function findPokemonBuddy(pokemon_name: string) {
  const response = await axios.get(
    "https://pogoapi.net/api/v1/pokemon_buddy_distances.json"
  )
  return Object.values(response.data)
    .flat()
    .find(
      (pokemon: any) =>
        pokemon.pokemon_name.toLowerCase() === pokemon_name.toLowerCase() &&
        pokemon.form === "Normal"
    )
}

async function findPokemonBoosted(pokemonName: string) {
  try {
    const response = await axios.get(
      `https://pogoapi.net/api/v1/weather_boosts.json`
    )
    const pokemonDetails = await getPokemonDetails(pokemonName)
    const pokemonTypes = await getPokemonTypes(pokemonDetails)
    const [type1, type2] = pokemonTypes
    let filteredWeather: string[] = []

    for (const weather in response.data) {
      if (
        response.data[weather].includes(capitalize(type1)) ||
        response.data[weather].includes(capitalize(type2))
      ) {
        filteredWeather.push(weather)
      }
    }
    return filteredWeather
  } catch (error) {
    console.error("Error in findPokemonBoosted:", error)
    throw error
  }
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

      const noDamageFrom1 = await getNoDmgFrom(type1)
      const noDamageFrom2 = await getNoDmgFrom(type2)

      const dualTypeVulnerable = [
        ...doubleDamageFrom1,
        ...doubleDamageFrom2,
      ].filter(
        (val) =>
          !halfDamageFrom1.includes(val) &&
          !halfDamageFrom2.includes(val) &&
          !noDamageFrom1.includes(val) &&
          !noDamageFrom2.includes(val)
      )

      return Array.from(new Set(dualTypeVulnerable))
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

      const dualTypeStrength = {
        [type1]: doubleDmgTo1,
        [type2]: doubleDmgTo2,
      }

      return dualTypeStrength
    } else {
      const [type] = pokemonTypes
      const doubleDmgTo1 = await getTypeDoubleDmgTo(type)

      const doubleDmgTo = {
        [type]: doubleDmgTo1,
      }

      return doubleDmgTo
    }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

async function findDualTypeHalfDmgFrom(pokemonName: string) {
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

      const noDamageFrom1 = await getNoDmgFrom(type1)
      const noDamageFrom2 = await getNoDmgFrom(type2)

      let dualTypeResistant = [...halfDamageFrom1, ...halfDamageFrom2].filter(
        (val) =>
          !doubleDamageFrom1.includes(val) && !doubleDamageFrom2.includes(val)
      )

      dualTypeResistant = [
        ...dualTypeResistant,
        ...noDamageFrom1,
        ...noDamageFrom2,
      ]

      return Array.from(new Set(dualTypeResistant))
    } else {
      const [type] = pokemonTypes
      const halfDamageFrom = await getTypeHalfDmgFrom(type)
      return halfDamageFrom
    }
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}

async function findFlavorText(pokemonName: string) {
  try {
    const pokemonDetails = await getFlavorTextEntries(pokemonName)
    const flavorText = pokemonDetails.flavor_text_entries.filter(
      (languages: { language: { name: string } }) =>
        languages.language.name === "en"
    )
    return flavorText.pop().flavor_text
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
