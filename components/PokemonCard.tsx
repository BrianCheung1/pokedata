import { capitalize } from "@/libs/utils"
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core"
import { Skeleton } from "@mantine/core"

interface PokemonCardProps {
  pokemon: Record<string, any>
  isLoading: boolean
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isLoading,
}) => {
  const renderTypeEffectiveness = () => {
    const list = []

    for (const key in pokemon?.type_effectiveness) {
      if (key) list.push(<div>{`${capitalize(key)} Moves`}:</div>)
      for (const key2 in pokemon?.type_effectiveness[key]) {
        list.push(
          <div>{`Effective against ${pokemon?.type_effectiveness[key][key2]} types`}</div>
        )
      }
    }
    if (list.length <= 0) {
      return "N/A"
    }
    return list
  }

  const renderTypeWeakness = () => {
    return pokemon?.type_weakness?.join(", ")
  }

  const renderBadges = () => {
    const list = []
    for (const pokemon_types in pokemon?.pokemon_types) {
      list.push(
        <Badge color="pink" variant="light">
          {pokemon?.pokemon_types[pokemon_types]}
        </Badge>
      )
    }
    return list
  }

  return (
    <Skeleton visible={isLoading}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={pokemon?.sprite ?  `${pokemon?.sprite}` : `/images/og-default-image.jpeg`} height={160} alt="Pokemon" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text size="xl" fw={500}>
            {capitalize(pokemon?.pokemon_name)}
          </Text>
          <Text>{renderBadges()}</Text>
        </Group>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        Strengths
        <Text size="md" c="dimmed">
          {renderTypeEffectiveness()}
        </Text>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <Card.Section inheritPadding mt="sm" pb="md">
          Weakness
          <Text size="md" c="dimmed">
            {renderTypeWeakness()}
          </Text>
        </Card.Section>
      </Card>
    </Skeleton>
  )
}
