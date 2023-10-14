"use client"
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
import { useRouter } from "next/navigation"
import { colors } from "@/libs/utils"

export const PokemonList = () => {
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  const renderPokemons = allPokemons?.pokemons?.map((pokemon: any) => (
    <Card
      bg={darken(colors[pokemon.type[0].toLowerCase()], 0.7)}
      onClick={() => router.push(`/pokemons/${pokemon.pokemon_name}`)}
      className="cursor-pointer mb-2"
      radius="md"
      withBorder
      key={pokemon.pokemon_name}
    >
      <Flex gap="sm" align="center">
        <Image
          src={`https://img.pokemondb.net/sprites/go/normal/${pokemon.pokemon_name.toLowerCase()}.png`}
          h={50}
          w={50}
          fit="contain"
          alt="Pokemon"
          fallbackSrc="/images/default-pokemon.jpg"
        />
        <Flex direction="column">
          <Text fw={500}>{pokemon.pokemon_name}</Text>
          <Text size="xs" c="dimmed">
            #{pokemon.pokemon_id}
          </Text>
        </Flex>
        <Group className="ml-auto" gap="xs">
          {pokemon?.type?.map((type: string) => (
            <Badge key={type} color={colors[type.toLowerCase()]}>
              {type}
            </Badge>
          ))}
        </Group>
      </Flex>
    </Card>
  ))

  return (
    <ScrollArea h={850} type="auto" offsetScrollbars>
      {renderPokemons}
    </ScrollArea>
  )
}
