import { capitalize } from "@/libs/utils"
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core"
import { Skeleton, Grid, SimpleGrid } from "@mantine/core"
import { colors } from "@/libs/utils"

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
      if (key)
        list.push(
          <Grid.Col key={pokemon?.type_effectiveness[key]}>
            {`${capitalize(key)} Moves`}:
          </Grid.Col>
        )
      for (const key2 in pokemon?.type_effectiveness[key]) {
        list.push(
          <Grid.Col
            key={key + key2 + pokemon?.type_effectiveness[key][key2]}
          >{`Effective against ${pokemon?.type_effectiveness[key][key2]} types`}</Grid.Col>
        )
      }
    }
    return list
  }

  const renderTypeVulnerable = () => {
    const list: any = []
    pokemon?.type_vulnerable?.sort().forEach((element: string) => {
      list.push(
        <Badge
          key={element}
          className="mr-2"
          color={colors[element.toLowerCase()]}
        >
          {element}
        </Badge>
      )
    })
    return list
  }

  const renderTypeResistances = () => {
    const list: any = []
    pokemon?.type_resistant?.sort().forEach((element: string) => {
      list.push(
        <Badge
          key={element}
          className="mr-2"
          color={colors[element.toLowerCase()]}
        >
          {element}
        </Badge>
      )
    })
    return list
  }

  const renderBadges = () => {
    const list = []
    for (const pokemon_types in pokemon?.pokemon_types) {
      list.push(
        <Badge
          key={pokemon_types}
          color={colors[pokemon.pokemon_types[pokemon_types]]}
        >
          {pokemon?.pokemon_types[pokemon_types]}
        </Badge>
      )
    }
    return list
  }
  return (
    <Skeleton visible={isLoading}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid justify="space-evenly">
          <Grid.Col span="content" className="text-center">
            <Image src={pokemon?.sprite} h={200} fit="contain" alt="Pokemon" />
            <Badge>Base</Badge>
          </Grid.Col>

          {pokemon?.shiny && (
            <Grid.Col span="content" className="text-center">
              <Image
                src={pokemon?.sprite_shiny}
                h={200}
                fit="contain"
                alt="Pokemon"
              />
              <Badge color="#F7D02C">Shiny</Badge>
            </Grid.Col>
          )}
        </Grid>
        <Group justify="space-between" mt="md" mb="xs">
          <Text size="xl" fw={500}>
            {capitalize(pokemon?.pokemon_name)}
          </Text>
          <Group justify="space-between">{renderBadges()}</Group>
        </Group>
        <Text size="xs">{pokemon?.pokemon_flavor_text}</Text>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <Grid className="text-center">
          <Grid.Col span={6}>
            <Text>Resistant To</Text>
            {renderTypeResistances()}
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>Vulnerable To</Text>
            {renderTypeVulnerable()}
          </Grid.Col>
        </Grid>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {/* <Grid columns={24}>{renderTypeEffectiveness()}</Grid>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
        Shiny Rate
        <Text size="md" c="dimmed">
          Found in Egg: {pokemon?.shiny?.found_egg ? "True" : "N/A"}
        </Text>
        <Text size="md" c="dimmed">
          Found in Research: {pokemon?.shiny?.found_research ? "True" : "N/A"}
        </Text>
        <Text size="md" c="dimmed">
          Found in Wild: {pokemon?.shiny?.found_wild ? "True" : "N/A"}
        </Text>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        Pokemon Stats
        <Text size="md" c="dimmed">
          Base Attack: {pokemon?.pokemon_stats?.base_attack}
        </Text>
        <Text size="md" c="dimmed">
          Base Defense: {pokemon?.pokemon_stats?.base_defense}
        </Text>
        <Text size="md" c="dimmed">
          Base Stamina: {pokemon?.pokemon_stats?.base_stamina}
        </Text>
      </Card>
    </Skeleton>
  )
}
