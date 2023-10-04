import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: Request,
  { params }: { params: { pokemon_name: string } }
) {
  const pokemon_name = params.pokemon_name
  console.log(pokemon_name)
  try {
    const types = await axios.get(
      "https://pogoapi.net/api/v1/pokemon_types.json"
    )

    const pokemon_id = types.data.find(
      (data: { pokemon_name: string }) =>
        data.pokemon_name.toLowerCase() === pokemon_name.toLowerCase()
    ).id
    const pokemon_types = types.data.find(
      (data: { pokemon_name: string }) =>
        data.pokemon_name.toLowerCase() === pokemon_name.toLowerCase()
    ).type

    const type_effectiveness = await axios.get(
      "https://pogoapi.net/api/v1/type_effectiveness.json"
    )
    let type_effectiveness_data = type_effectiveness.data
    for (const key in type_effectiveness_data) {
      if (pokemon_types.includes(key)) {
        type_effectiveness_data[key] = type_effectiveness_data[key]
      } else {
        delete type_effectiveness_data[key]
      }
    }

    for (const key in type_effectiveness_data) {
      for (const key2 in type_effectiveness_data[key]) {
        if (
          Number(type_effectiveness_data[key][key2]) < 1.6 ||
          pokemon_types.includes(key2)
        )
          delete type_effectiveness_data[key][key2]
      }
    }

    return NextResponse.json(
      {
        msg: "Success",
        pokemon_types: pokemon_types,
        type_effectiveness: type_effectiveness_data,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 })
  }
}
