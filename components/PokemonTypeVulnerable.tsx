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
    if (
      !pokemon_advantages ||
      !pokemon_advantages.vulnerable ||
      pokemon_advantages.vulnerable.length === 0
    ) {
      return <Badge>N/A</Badge>
    }
    return pokemon_advantages.vulnerable
      .sort((a, b) => {
        const valueA = a[Object.keys(a)[0]]
        const valueB = b[Object.keys(b)[0]]
        return valueA - valueB
      })
      .map((element) => (
        <Badge
          key={Object.keys(element)[0]}
          className="mr-2"
          color={colors[Object.keys(element)[0].toLowerCase()]}
        >
          {Object.keys(element)[0]} {element[Object.keys(element)[0]]}%
        </Badge>
      ))
  }

  return (
    <>
      <Title order={5}>Vulnerable To</Title>
      {renderTypeVulnerable()}
    </>
  )
}
