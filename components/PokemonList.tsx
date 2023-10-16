import useAllPokemons from "@/hooks/useAllPokemons"
import {
  Card,
  Text,
  ScrollArea,
  Flex,
  Badge,
  Group,
  darken,
  Image,
} from "@mantine/core"
import { colors } from "@/libs/utils"

export const PokemonList = () => {
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()

  const renderPokemons = allPokemons?.pokemons?.map(
    (pokemon: {
      pokemon_name: string
      form: string
      pokemon_id: number
      type: string[]
    }) => {
      const pokemonNameMap: Record<string, string> = {
        "Nidoran♀": "nidoran-f",
        "Nidoran♂": "nidoran-m",
        "Farfetch’d": "farfetchd",
      }
      const transformedName =
        pokemonNameMap[pokemon.pokemon_name] ||
        pokemon.pokemon_name.toLowerCase()

      const cardBgColor = darken(colors[pokemon.type[0].toLowerCase()], 0.7)

      return (
        <Card
          bg={cardBgColor}
          className="cursor-pointer mb-2"
          radius="md"
          withBorder
          component="a"
          href={`/pokemons/${pokemon.pokemon_name}`}
          key={pokemon.pokemon_name + pokemon.form}
        >
          <Flex gap="sm" align="center">
            <Image
              src={
                pokemon.form === "Normal"
                  ? `https://img.pokemondb.net/sprites/go/normal/${transformedName}.png`
                  : `https://img.pokemondb.net/sprites/go/normal/${transformedName}-${pokemon.form.toLowerCase()}.png`
              }
              h={50}
              w={50}
              fit="contain"
              alt="Pokemon"
            />
            <Flex direction="column">
              <Text fw={500}>{`${pokemon.pokemon_name} ${
                pokemon.form === "Normal" ? "" : pokemon.form
              }`}</Text>
              <Text size="xs" c="dimmed">
                #{pokemon.pokemon_id}
              </Text>
            </Flex>
            <Group className="ml-auto" gap="xs">
              {pokemon.type?.map((type: string) => (
                <Badge key={type} color={colors[type.toLowerCase()]}>
                  {type}
                </Badge>
              ))}
            </Group>
          </Flex>
        </Card>
      )
    }
  )

  return (
    <ScrollArea h={850} type="auto" offsetScrollbars>
      {renderPokemons}
    </ScrollArea>
  )
}
