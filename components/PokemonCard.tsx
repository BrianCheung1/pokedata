import { capitalize } from "@/libs/utils"
import {
  Card,
  Text,
  Skeleton,
  Grid,
  Title,
  Stack,
  Tabs,
  Divider,
  darken,
} from "@mantine/core"
import { PokemonTypeVulnerable } from "./PokemonTypeVulnerable"
import { PokemonTypeResistance } from "./PokemonTypeResistance"
import { PokemonStats } from "./PokemonStats"
import { PokemonShiny } from "./PokemonShiny"
import { PokemonImages } from "./PokemonImages"
import { PokemonTypes } from "./PokemonTypes"
import { PokemonWeatherBoosted } from "./PokemonWeatherBoosted"
import { PokemonMoves } from "./PokemonMoves"
import { PokemonEvolutions } from "./PokemonEvolutions"
import { PokemonCPRange } from "./PokemonCPRange"
import { colors } from "@/libs/utils"

interface PokemonCardProps {
  pokemon: Record<string, any>
  isLoading: boolean
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isLoading,
}) => {
  return (
    <Tabs variant="pills" defaultValue="details" className="pb-5 " >
      <Tabs.List grow justify="center" className="pb-2">
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="shiny">Shiny Rates</Tabs.Tab>
        <Tabs.Tab value="moves">Moves</Tabs.Tab>
        <Tabs.Tab value="evolutions">Evolutions</Tabs.Tab>
        <Tabs.Tab value="cp">CP Range</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="details">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder bg={darken(colors[pokemon?.pokemon_types?.[0]] ? colors[pokemon?.pokemon_types?.[0]] : "blue", 0.7) }>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`#${pokemon?.pokemon_id}`}</Text>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <Divider my="sm" variant="dashed" />
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
            <Divider my="sm" variant="dashed" />
            <Grid className="text-center">
              <Grid.Col span={6}>
                <PokemonTypeResistance pokemon={pokemon} />
              </Grid.Col>
              <Grid.Col span={6}>
                <PokemonTypeVulnerable pokemon={pokemon} />
              </Grid.Col>
            </Grid>
            <Divider my="sm" variant="dashed" />
            <PokemonStats pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="shiny">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder bg={darken(colors[pokemon?.pokemon_types?.[0]] ? colors[pokemon?.pokemon_types?.[0]] : "blue", 0.7) }>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <Divider my="sm" variant="dashed" />
            <PokemonShiny pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="moves">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder bg={darken(colors[pokemon?.pokemon_types?.[0]] ? colors[pokemon?.pokemon_types?.[0]] : "blue", 0.7) }>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <Divider my="sm" variant="dashed" />
            <PokemonMoves pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="evolutions">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" withBorder bg={darken(colors[pokemon?.pokemon_types?.[0]] ? colors[pokemon?.pokemon_types?.[0]] : "blue", 0.7) }>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <Divider my="sm" variant="dashed" />
            <PokemonEvolutions pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
      <Tabs.Panel value="cp">
        <Skeleton visible={isLoading}>
          <Card shadow="sm" padding="lg" radius="md" bg={darken(colors[pokemon?.pokemon_types?.[0]] ? colors[pokemon?.pokemon_types?.[0]] : "blue", 0.7) }>
            <Title className="text-center" order={1}>
              {capitalize(pokemon?.pokemon_name)}
            </Title>
            <Text
              size="xs"
              c="dimmed"
              className="text-center"
            >{`"${pokemon?.pokemon_flavor_text}"`}</Text>
            <PokemonImages pokemon={pokemon} />
            <Divider my="sm" variant="dashed" />
            <PokemonCPRange pokemon={pokemon} />
          </Card>
        </Skeleton>
      </Tabs.Panel>
    </Tabs>
  )
}
