import React from "react"
import { Badge, Title } from "@mantine/core"
import { colors } from "@/libs/utils"

interface PokemonTypeResistanceProps {
  pokemon: {
    pokemon_advantages?: {
      vulnerable?: Record<string, number>[]
      resistant?: Record<string, number>[]
    }
  }
}

export const PokemonTypeResistance: React.FC<PokemonTypeResistanceProps> = ({
  pokemon: { pokemon_advantages },
}) => {
  const renderTypeResistances = () => {
    const resistantArray = pokemon_advantages?.resistant || []

    if (!resistantArray.length) {
      return <Badge>N/A</Badge>
    }

    const sortedResistantArray = resistantArray.sort(
      (a, b) => b[Object.keys(b)[0]] -a[Object.keys(a)[0]]
    )

    return sortedResistantArray.map((element) => {
      const key = Object.keys(element)[0]
      const percentage = element[key]

      return (
        <Badge key={key} className="mr-2" color={colors[key.toLowerCase()]}>
          {key} {percentage}%
        </Badge>
      )
    })
  }

  return (
    <>
      <Title order={5}>Resistant To</Title>

      {renderTypeResistances()}
    </>
  )
}
