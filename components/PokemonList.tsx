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
  Autocomplete,
} from "@mantine/core"
import { colors } from "@/libs/utils"
import { useState, useMemo } from "react"

export const PokemonList = () => {
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const [filter, setFilter] = useState("")

  const autocompleteData = useMemo(() => {
    return allPokemons?.pokemons
      ?.filter((pokemon: { form: string }) => pokemon.form === "Normal")
      .map((pokemon: { pokemon_name: string; form: string }) => ({
        label: pokemon.pokemon_name,
        value: pokemon.pokemon_name + pokemon.form,
      }));
  }, [allPokemons]);

  const filteredPokemons = useMemo(() => {
    return allPokemons?.pokemons?.filter(
      (pokemon: { pokemon_name: string }) =>
        pokemon.pokemon_name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [allPokemons, filter]);

  const renderPokemons = filteredPokemons?.map(
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

      const cardBgColor = pokemon.type
        ? darken(colors[pokemon.type[0].toLowerCase()], 0.7)
        : "blue"

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
    <>
      <Autocomplete
        value={filter}
        className="flex items-center justify-center mb-5"
        placeholder="Search Pokemon..."
        data={autocompleteData}
        onChange={(newValue) => setFilter(newValue)}
        maxDropdownHeight={200}
        onOptionSubmit={(newValue) => {
          setFilter(newValue)
        }}
      />
      <ScrollArea h={850} type="auto" offsetScrollbars>
        {renderPokemons}
      </ScrollArea>
    </>
  )
}
