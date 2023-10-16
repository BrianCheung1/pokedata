import React from "react"
import { Badge, Title } from "@mantine/core"
import { colors } from "@/libs/utils"

interface PokemonTypeVulnerableProps {
  pokemon: {
    pokemon_advantages?: {
      vulnerable?: Record<string, number>[]
      resistant?: Record<string, number>[]
    }
  }
}

export const PokemonTypeVulnerable: React.FC<PokemonTypeVulnerableProps> = ({
  pokemon: { pokemon_advantages },
}) => {
  const renderTypeVulnerable = () => {
    const vulnerableArray = pokemon_advantages?.vulnerable || []

    if (!vulnerableArray.length) {
      return <Badge>N/A</Badge>
    }

    const sortedVulnerableArray = vulnerableArray.sort(
      (a, b) => b[Object.keys(b)[0]]-a[Object.keys(a)[0]]
    )

    return sortedVulnerableArray.map((element) => {
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
      <Title order={5}>Vulnerable To</Title>
      {renderTypeVulnerable()}
    </>
  )
}
