import { Text, Badge, Title, Stack } from "@mantine/core"
import { colors } from "@/libs/utils"

interface PokemonTypesProps {
  pokemon: Record<string, any>
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({
  pokemon: { pokemon_types },
}) => {
  const renderTypes = () => {
    const list = []
    for (const types in pokemon_types) {
      list.push(
        <Badge
          key={types}
          color={colors[pokemon_types[types]]}
        >
          {pokemon_types[types]}
        </Badge>
      )
    }
    return list
  }

  return (
    <Stack justify="center" align="center">
      <Title order={5}>Type</Title>
      <Text>{renderTypes()}</Text>
    </Stack>
  )
}
