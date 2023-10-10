import { Text, Title } from "@mantine/core"

interface PokemonStatsProps {
  pokemon: Record<string, any>
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({
  pokemon : {pokemon_stats},
}) => {
  return (
    <>
      <Title order={5}>Pokemon Stats</Title>
      <Text size="md" c="dimmed">
        Max CP: {pokemon_stats?.max_cp}
      </Text>
      <Text size="md" c="dimmed">
        Base Attack: {pokemon_stats?.base_attack}
      </Text>
      <Text size="md" c="dimmed">
        Base Defense: {pokemon_stats?.base_defense}
      </Text>
      <Text size="md" c="dimmed">
        Base Stamina: {pokemon_stats?.base_stamina}
      </Text>
    </>
  )
}
