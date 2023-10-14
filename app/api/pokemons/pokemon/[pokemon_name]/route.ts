import { NextResponse } from "next/server"
import Axios from "axios"
import { capitalize } from "@/libs/utils"
import { setupCache } from "axios-cache-interceptor"
const DEFAULT_CACHE_TIME = 5 * 60 * 1000
const POGOAPI = "https://pogoapi.net/api/v1"
const POKEAPI = "https://pokeapi.co/api/v2"

//default cache time 5mins
const axios = setupCache( Axios)

export async function GET(
  req: Request,
  { params }: { params: { pokemon_name: string } }
) {
  const pokemon_name = params.pokemon_name.toLowerCase()
  try {
    const pokemon_details = await getPokemonDetails(pokemon_name)
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
      moves,
      evolution_family,
      cp_range,
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
      findAllMoves(pokemon_name),
      findEvolutionFamily(pokemon_name),
      findCPRange(pokemon_name),
    ])

    return NextResponse.json(
      {
        msg: "Success",
        pokemon_name: pokemon_name,
        pokemon_id: pokemon_details.id,
        pokemon_types: pokemon_types,
        type_effectiveness: type_effectiveness,
        type_vulnerable: type_vulnerable,
        type_resistant: type_resistant,
        shiny: shiny,
        pokemon_stats: pokemon_stats,
        pokemon_flavor_text: pokemon_flavor_text,
        pokemon_weather_boosted: pokemon_weather_boosted,
        buddy_distance: buddy_distance,
        moves: moves,
        evolution_family: evolution_family,
        cp_range: cp_range,
        sprite: `https://img.pokemondb.net/sprites/go/normal/${pokemon_details.name}.png`,
        sprite_shiny: `https://img.pokemondb.net/sprites/go/shiny/${pokemon_details.name}.png`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Get Error", error }, { status: 500 })
  }
}

async function getPokemonDetails(pokemonName: string) {
  if (pokemonName === "nidoran♀") {
    pokemonName = "nidoran-f"
  } else if (pokemonName === "nidoran♂") {
    pokemonName = "nidoran-m"
  }
  const response = await axios.get(`${POKEAPI}/pokemon/${pokemonName}`)
  return response.data
}

async function getFlavorTextEntries(pokemonName: string) {
  if (pokemonName === "nidoran♀") {
    pokemonName = "nidoran-f"
  } else if (pokemonName === "nidoran♂") {
    pokemonName = "nidoran-m"
  }
  const response = await axios.get(`${POKEAPI}/pokemon-species/${pokemonName}`)
  return response.data
}

async function getTypeDoubleDmgFrom(typeName: string) {
  const response = await axios.get(`${POKEAPI}/type/${typeName}`)
  return response.data.damage_relations.double_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

async function getTypeHalfDmgFrom(typeName: string) {
  const response = await axios.get(`${POKEAPI}/type/${typeName}`)
  return response.data.damage_relations.half_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

async function getTypeDoubleDmgTo(typeName: string) {
  const response = await axios.get(`${POKEAPI}/type/${typeName}`)
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: string }) => type.name
  )
}

async function getTypeHalfDmgTo(typeName: string) {
  const response = await axios.get(`${POKEAPI}/type/${typeName}`)
  return response.data.damage_relations.double_damage_to.map(
    (type: { name: string }) => type.name
  )
}

async function getNoDmgFrom(typeName: string) {
  const response = await axios.get(`${POKEAPI}/type/${typeName}`)
  return response.data.damage_relations.no_damage_from.map(
    (type: { name: string }) => capitalize(type.name)
  )
}

async function getFastMove(moveName: string) {
  const response = await axios.get(`${POGOAPI}/fast_moves.json`)
  return response.data.find((move: { name: string }) => move.name === moveName)
}

async function getChargedMove(moveName: string) {
  const response = await axios.get(`${POGOAPI}/charged_moves.json`)
  return response.data.find((move: { name: string }) => move.name === moveName)
}

async function getEvolutions(pokemonName: string) {
  if (pokemonName === "nidoran♀") {
    pokemonName = "nidoran-f"
  } else if (pokemonName === "nidoran♂") {
    pokemonName = "nidoran-m"
  }
  const response = await axios.get(`${POKEAPI}/pokemon-species/${pokemonName}`)
  const response2 = await axios.get(response.data.evolution_chain.url)
  function getAllEvolutions(evolutionChain: { chain: any }) {
    const evolutions: { name: any; sprite: any }[] = []

    async function traverseChain(chain: { species: any; evolves_to: any }) {
      const currentSpecies = chain.species
      evolutions.push({
        name: currentSpecies.name,
        sprite: `https://img.pokemondb.net/sprites/go/normal/${currentSpecies.name}.png`,
      })

      if (chain.evolves_to) {
        for (const evolution of chain.evolves_to) {
          traverseChain(evolution)
        }
      }
    }

    traverseChain(evolutionChain.chain)
    return evolutions
  }

  return getAllEvolutions(response2.data)
}

async function getCurrentMoves(pokemonName: string) {
  const response = await axios.get(`${POGOAPI}/current_pokemon_moves.json? `)
  const pokemonDetails = await getPokemonDetails(pokemonName)
  const pokemonTypes = await getPokemonTypes(pokemonDetails)
  const pokemonMoves = response.data.find(
    (pokemon: { pokemon_name: string; form: string }) =>
      pokemon.pokemon_name.toLowerCase() === pokemonName &&
      pokemon.form === "Normal"
  )
  if (pokemonMoves.cached) return pokemonMoves
  // Helper function to handle move details retrieval
  const fetchMoveDetails = async (moveName: string, isCharged: boolean) => {
    try {
      const moveDetails = (await isCharged)
        ? await getChargedMove(moveName)
        : await getFastMove(moveName)
      if (moveDetails && moveDetails.power && moveDetails.duration) {
        return {
          name: moveDetails.name,
          dps: pokemonTypes.includes(moveDetails.type.toLowerCase())
            ? ((moveDetails.power / moveDetails.duration) * 1.2 * 1000).toFixed(
                2
              )
            : ((moveDetails.power / moveDetails.duration) * 1000).toFixed(2),
          dpe: Math.abs(moveDetails.power / moveDetails.energy_delta).toFixed(
            2
          ),
          eps: (
            (moveDetails.energy_delta / moveDetails.duration) *
            1000
          ).toFixed(2),

          total: pokemonTypes.includes(moveDetails.type.toLowerCase())
            ? (
                (moveDetails.power / moveDetails.duration) *
                1.2 *
                1000 *
                Math.abs(moveDetails.power / moveDetails.energy_delta)
              ).toFixed(2)
            : ((moveDetails.power / moveDetails.duration) * 1000).toFixed(2),
          type: moveDetails.type,
        }
      } else if (moveDetails.power === 0) {
        return {
          name: moveDetails.name,
          dps: "0.00",
          eps: (
            (moveDetails.energy_delta / moveDetails.duration) *
            1000
          ).toFixed(2),
          dpe: "0.00",
          total: "0.00",
          type: moveDetails.type,
        }
      } else {
        console.error(`Invalid data for move: ${JSON.stringify(moveDetails)}`)
        return { name: "Unknown", dps: "0.00" }
      }
    } catch (error) {
      console.error(`Error fetching move details: ${error}`)
      return { name: "Unknown", dps: "0.00" }
    }
  }

  // Fetch move details for each type of move
  const [fastMoves, eliteFastMoves, chargedMoves, eliteChargedMoves] =
    await Promise.all([
      Promise.all(
        pokemonMoves.fast_moves.map((element: string) =>
          fetchMoveDetails(element, false)
        )
      ),
      Promise.all(
        pokemonMoves.elite_fast_moves.map((element: string) =>
          fetchMoveDetails(element, false)
        )
      ),
      Promise.all(
        pokemonMoves.charged_moves.map((element: string) =>
          fetchMoveDetails(element, true)
        )
      ),
      Promise.all(
        pokemonMoves.elite_charged_moves.map((element: string) =>
          fetchMoveDetails(element, true)
        )
      ),
    ])

  // Update pokemonMoves object
  pokemonMoves.fast_moves = fastMoves.sort((a, b) => b.eps - a.eps)
  pokemonMoves.elite_fast_moves = eliteFastMoves.sort((a, b) => b.eps - a.eps)
  pokemonMoves.charged_moves = chargedMoves.sort((a, b) => b.total - a.total)
  pokemonMoves.elite_charged_moves = eliteChargedMoves.sort(
    (a, b) => b.total - a.total
  )
  pokemonMoves.cached = true
  return pokemonMoves
}

function getPokemonTypes(pokemon: { types: { type: { name: string } }[] }) {
  return pokemon.types.map((type: { type: { name: string } }) => type.type.name)
}

async function getShiny(pokemon_name: string) {
  const response = await axios.get(`${POGOAPI}/shiny_pokemon.json`)
  const pokemon_details = await getPokemonDetails(pokemon_name)
  return response.data[Number(pokemon_details.id)]
}

async function getPokemonStats(pokemon_name: string) {
  const response = await axios.get(`${POGOAPI}/pokemon_stats.json`)
  const response2 = await axios.get(`${POGOAPI}/pokemon_max_cp.json`)
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

async function getCPMultiplier() {
  const response = await axios.get(`${POGOAPI}/cp_multiplier.json`)
  return response.data
}
async function findPokemonBuddy(pokemon_name: string) {
  try {
    const response = await axios.get(`${POGOAPI}/pokemon_buddy_distances.json`)
    return Object.values(response.data)
      .flat()
      .find(
        (pokemon: any) =>
          pokemon.pokemon_name.toLowerCase() === pokemon_name.toLowerCase() &&
          pokemon.form === "Normal"
      )
  } catch (error) {
    return NextResponse.json(
      { msg: "findPokemonBuddy Error", error },
      { status: 500 }
    )
  }
}

async function findPokemonBoosted(pokemonName: string) {
  try {
    const response = await axios.get(`${POGOAPI}/weather_boosts.json`)
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
    return NextResponse.json(
      { msg: "findPokemonBoosted Error", error },
      { status: 500 }
    )
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
    return NextResponse.json(
      { msg: "findDualTypeDoubleDmgFrom Error", error },
      { status: 500 }
    )
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
    return NextResponse.json(
      { msg: "findDualTypeDoubleDmgTo error", error },
      { status: 500 }
    )
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
    return NextResponse.json(
      { msg: "findDualTypeHalfDmgFrom error", error },
      { status: 500 }
    )
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
    return NextResponse.json(
      { msg: "findFlavorText error", error },
      { status: 500 }
    )
  }
}

async function findAllMoves(pokemonName: string) {
  try {
    let pokemonMoves = await getCurrentMoves(pokemonName)
    return pokemonMoves
  } catch (error) {
    return NextResponse.json(
      { msg: "findAllMoves error", error },
      { status: 500 }
    )
  }
}

async function findEvolutionFamily(pokemonName: string) {
  try {
    const pokemonEvolution = await getEvolutions(pokemonName)
    return pokemonEvolution
  } catch (error) {
    return NextResponse.json(
      { msg: "findEvolutionFamily error", error },
      { status: 500 }
    )
  }
}

async function findCPRange(pokemonName: string) {
  try {
    const pokemonStats = await getPokemonStats(pokemonName)
    let CPMultiplier = await getCPMultiplier()
    CPMultiplier.push({ level: 45.5, multiplier: 0.81779999 })
    CPMultiplier.push({ level: 46, multiplier: 0.82029999 })
    CPMultiplier.push({ level: 46.5, multiplier: 0.82279999 })
    CPMultiplier.push({ level: 47, multiplier: 0.82529999 })
    CPMultiplier.push({ level: 47.5, multiplier: 0.82779999 })
    CPMultiplier.push({ level: 48, multiplier: 0.83029999 })
    CPMultiplier.push({ level: 48.5, multiplier: 0.83279999 })
    CPMultiplier.push({ level: 49, multiplier: 0.83529999 })
    CPMultiplier.push({ level: 49.5, multiplier: 0.83779999 })
    CPMultiplier.push({ level: 50, multiplier: 0.84029999 })
    CPMultiplier.push({ level: 50.5, multiplier: 0.84279999 })
    let data: any = []
    CPMultiplier.map((cp: { level: number; multiplier: number }) => {
      if (Number.isInteger(cp.level)) {
        data.push({
          level: cp.level,
          range: `${Math.floor(
            (pokemonStats.base_attack *
              Math.pow(pokemonStats.base_defense, 0.5) *
              Math.pow(pokemonStats.base_stamina, 0.5) *
              Math.pow(cp.multiplier, 2)) /
              10
          )}-${Math.floor(
            ((pokemonStats.base_attack + 15) *
              Math.pow(pokemonStats.base_defense + 15, 0.5) *
              Math.pow(pokemonStats.base_stamina + 15, 0.5) *
              Math.pow(cp.multiplier, 2)) /
              10
          )}`,
        })
      }
    })
    return data
  } catch (error) {
    return NextResponse.json(
      { msg: "findEvolutionFamily error", error },
      { status: 500 }
    )
  }
}
