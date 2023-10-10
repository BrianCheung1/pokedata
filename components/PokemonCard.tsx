import { capitalize } from "@/libs/utils"
import {
  Card,
  Text,
  Skeleton,
  Grid,
  Flex,
  Title,
  Stack,
  Tabs,
} from "@mantine/core"
import { PokemonTypeVulnerable } from "./PokemonTypeVulnerable"
import { PokemonTypeResistance } from "./PokemonTypeResistance"
import { PokemonStats } from "./PokemonStats"
import { PokemonShiny } from "./PokemonShiny"
import { PokemonImages } from "./PokemonImages"
import { PokemonTypes } from "./PokemonTypes"
import { PokemonWeatherBoosted } from "./PokemonWeatherBoosted"
import { PokemonMoves } from "./PokemonMoves"

interface PokemonCardProps {
  pokemon: Record<string, any>
  isLoading: boolean
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isLoading,
}) => {
  return (
    <Tabs variant="pills" defaultValue="details">
      <Tabs.List justify="center">
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="shiny">Shiny Rates</Tabs.Tab>
        <Tabs.Tab value="moves">Moves</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="details">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <Grid justify="space-around" className="text-center">
              <Grid.Col span={3}>
                <PokemonTypes pokemon={pokemon} />
              </Grid.Col>
              <Grid.Col span={3}>
                <PokemonWeatherBoosted pokemon={pokemon} />
              </Grid.Col>
              <Grid.Col span={3}>
                <Stack justify="center" align="center">
                  <Title order={5}>Buddy Distance</Title>
                  {pokemon?.buddy_distance?.distance}KM
                </Stack>
              </Grid.Col>
            </Grid>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <Grid className="text-center">
              <Grid.Col span={6}>
                <PokemonTypeResistance pokemon={pokemon} />
              </Grid.Col>
              <Grid.Col span={6}>
                <PokemonTypeVulnerable pokemon={pokemon} />
              </Grid.Col>
            </Grid>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <PokemonStats pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="shiny">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <PokemonShiny pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="moves">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <PokemonMoves pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
    </Tabs>
  )
}
