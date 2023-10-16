import { NextResponse } from "next/server"
import Axios from "axios"
import { capitalize } from "@/libs/utils"
import { setupCache } from "axios-cache-interceptor"
const POGOAPI = "https://pogoapi.net/api/v1"
const POKEAPI = "https://pokeapi.co/api/v2"

//default cache time 5mins
const axios = setupCache(Axios)

export async function GET(
  req: Request,
  { params }: { params: { pokemon_name: string } }
) {
  const regex = /[^a-zA-Z.♀♂]/g
  let pokemon_name = params.pokemon_name
    // .split(" ")[0]
    .replace(regex, "")
    .toLowerCase()

  if (pokemon_name === "nidoran♀") {
    pokemon_name = "nidoran-f"
  } else if (pokemon_name === "nidoran♂") {
    pokemon_name = "nidoran-m"
  } else if (pokemon_name === "mr.mime") {
    pokemon_name = "mr-mime"
  }
  try {
    const [
      pokemon_details,
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
      getPokemonDetails(pokemon_name),
      findDualTypeDoubleDmgFrom(pokemon_name),
      findDualTypeDoubleDmgTo(pokemon_name),
      getPokemonTypes(pokemon_name),
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
        sprite: pokemon_details.sprites.other.home.front_default
          ? pokemon_details.sprites.other.home.front_default
          : pokemon_details.sprites.other["official-artwork"].front_default,
        sprite_shiny: pokemon_details.sprites.other.home.front_shiny
          ? pokemon_details.sprites.other.home.front_shiny
          : pokemon_details.sprites.other["official-artwork"].front_shiny,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Get Error", error }, { status: 500 })
  }
}

async function getPokemonDetails(pokemonName: string) {
  const response = await axios.get(`${POKEAPI}/pokemon/${pokemonName}`)
  return response.data
}

async function getFlavorTextEntries(pokemonName: string) {
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
  const speciesResponse = await axios.get(
    `${POKEAPI}/pokemon-species/${pokemonName}`
  )
  const evolutionChainResponse = await axios.get(
    speciesResponse.data.evolution_chain.url
  )
  function getAllEvolutions(evolutionChain: { chain: any }) {
    const evolutions: { name: any; sprite: any }[] = []

    async function traverseChain(chain: { species: any; evolves_to: any }) {
      const currentSpecies = chain.species
      const pokemon_details = await getPokemonDetails(currentSpecies.name)
      evolutions.push({
        name: currentSpecies.name,
        sprite: pokemon_details.sprites.other.home.front_default
          ? pokemon_details.sprites.other.home.front_default
          : pokemon_details.sprites.other["official-artwork"].front_default,
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

  return getAllEvolutions(evolutionChainResponse.data)
}

async function getCurrentMoves(pokemonName: string) {
  const response = await axios.get(`${POGOAPI}/current_pokemon_moves.json? `)
  const pokemonDetails = await getPokemonDetails(pokemonName)
  const pokemonTypes = await getPokemonTypes(pokemonName)
  const pokemonMoves = response.data.find(
    (pokemon: { pokemon_id: number }) =>
      pokemon.pokemon_id === pokemonDetails.id
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

async function getPokemonTypes(pokemon_name: string) {
  const pokemon = await getPokemonDetails(pokemon_name)
  return pokemon.types.map((type: { type: { name: string } }) => type.type.name)
}

async function getShiny(pokemon_name: string) {
  const response = await axios.get(`${POGOAPI}/shiny_pokemon.json`)
  const pokemon_details = await getPokemonDetails(pokemon_name)
  return response.data[Number(pokemon_details.id)]
}

async function getPokemonStats(pokemon_name: string) {
  const pokemon_details = await getPokemonDetails(pokemon_name)
  const [statsResponse, maxCPResponse] = await Promise.all([
    axios.get(`${POGOAPI}/pokemon_stats.json`),
    axios.get(`${POGOAPI}/pokemon_max_cp.json`),
  ])
  const stats = statsResponse.data.find(
    (pokemon: { pokemon_id: number; form: string }) =>
      pokemon.pokemon_id === pokemon_details.id
  )
  const maxCP = maxCPResponse.data.find(
    (pokemon: { pokemon_id: number; form: string }) =>
      pokemon.pokemon_id === pokemon_details.id
  )

  stats.max_cp = maxCP.max_cp

  return stats
}

async function getCPMultiplier() {
  const response = await axios.get(`${POGOAPI}/cp_multiplier.json`)
  return response.data
}

async function findPokemonBuddy(pokemon_name: string) {
  try {
    const pokemon_details = await getPokemonDetails(pokemon_name)
    const response = await axios.get(`${POGOAPI}/pokemon_buddy_distances.json`)
    return Object.values(response.data)
      .flat()
      .find((pokemon: any) => pokemon.pokemon_id === pokemon_details.id)
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
    const pokemonTypes = await getPokemonTypes(pokemonName)
    const [type1, type2] = pokemonTypes
    const filteredWeather = Object.keys(response.data).filter(
      (weather) =>
        response.data[weather].includes(capitalize(type1)) ||
        response.data[weather].includes(capitalize(type2))
    )
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
    const pokemonTypes = await getPokemonTypes(pokemonName)
    const doubleDmgFromPromise = async (type: string) => {
      const doubleDamageFrom = await getTypeDoubleDmgFrom(type)
      return doubleDamageFrom
    }
    const halfDmgFromPromise = async (type: string) => {
      const halfDamageFrom = await getTypeHalfDmgFrom(type)
      return halfDamageFrom
    }
    const noDmgFromPromise = async (type: string) => {
      const noDamageFrom = await getNoDmgFrom(type)
      return noDamageFrom
    }

    const [double_dmg, half_dmg, no_dmg] = await Promise.all([
      Promise.all(pokemonTypes.map(doubleDmgFromPromise)),
      Promise.all(pokemonTypes.map(halfDmgFromPromise)),
      Promise.all(pokemonTypes.map(noDmgFromPromise)),
    ])

    let dualTypeVulnerable = double_dmg
      .flat()
      .filter(
        (val) => !half_dmg.flat().includes(val) && !no_dmg.flat().includes(val)
      )

    return Array.from(new Set(dualTypeVulnerable.flat()))
  } catch (error) {
    return NextResponse.json(
      { msg: "findDualTypeDoubleDmgFrom Error", error },
      { status: 500 }
    )
  }
}

async function findDualTypeDoubleDmgTo(pokemonName: string) {
  try {
    const pokemonTypes = await getPokemonTypes(pokemonName)
    const doubleDmgToPromise = async (type: string) => ({
      [type]: await getTypeDoubleDmgTo(type),
    })

    const double_dmg = await Promise.all(pokemonTypes.map(doubleDmgToPromise))
    return Object.assign({}, ...double_dmg)
  } catch (error) {
    return NextResponse.json(
      { msg: "findDualTypeDoubleDmgTo error", error },
      { status: 500 }
    )
  }
}

async function findDualTypeHalfDmgFrom(pokemonName: string) {
  try {
    const pokemonTypes = await getPokemonTypes(pokemonName)

    const doubleDmgFromPromise = async (type: string) => {
      const doubleDamageFrom = await getTypeDoubleDmgFrom(type)
      return doubleDamageFrom
    }
    const halfDmgFromPromise = async (type: string) => {
      const halfDamageFrom = await getTypeHalfDmgFrom(type)
      return halfDamageFrom
    }
    const noDmgFromPromise = async (type: string) => {
      const noDamageFrom = await getNoDmgFrom(type)
      return noDamageFrom
    }

    const [double_dmg, half_dmg, no_dmg] = await Promise.all([
      Promise.all(pokemonTypes.map(doubleDmgFromPromise)),
      Promise.all(pokemonTypes.map(halfDmgFromPromise)),
      Promise.all(pokemonTypes.map(noDmgFromPromise)),
    ])

    let dualTypeResistant = half_dmg
      .flat()
      .filter((val) => !double_dmg.flat().includes(val))
    const hasNonEmptyArray = no_dmg.flat().some((arr) => arr.length > 0)
    if (hasNonEmptyArray) {
      dualTypeResistant = [...dualTypeResistant, ...no_dmg]
    }

    return Array.from(new Set(dualTypeResistant.flat()))
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

async function findCPRange(pokemon_name: string) {
  try {
    const [pokemonStats, CPMultiplier] = await Promise.all([
      getPokemonStats(pokemon_name),
      getCPMultiplier(),
    ])
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
    const data = CPMultiplier.filter(
      (cp: { level: number; multiplier: number }) => Number.isInteger(cp.level)
    ).map((cp: { level: any; multiplier: number }) => ({
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
    }))

    return data
  } catch (error) {
    return NextResponse.json(
      { msg: "findEvolutionFamily error", error },
      { status: 500 }
    )
  }
}
