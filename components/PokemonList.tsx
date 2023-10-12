"use client"
import useAllPokemons from "@/hooks/useAllPokemons"
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ScrollArea,
  Stack,
  Flex,
} from "@mantine/core"
import { useRouter } from "next/navigation"

export const PokemonList = () => {
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  const renderPokemons = allPokemons?.pokemons?.map((pokemon) => (
    <Card
      onClick={() =>
        router.push(`/pokemons/${pokemon.pokemon_name.replace(/[^a-zA-Z]/g, "")}`)
      }
      className="cursor-pointer mb-2"
      radius="md"
      withBorder
      key={pokemon.pokemon_name}
    >
      <Flex gap="sm" align="center">
        <Flex direction="column">
          <Text fw={500}>{pokemon.pokemon_name}</Text>
          <Text size="xs" c="dimmed">
            #{pokemon.pokemon_id}
          </Text>
        </Flex>
        <Badge color="pink" variant="light" className="ml-auto">
          {pokemon.type.join(",")}
        </Badge>
      </Flex>
    </Card>
  ))

  return (
    <ScrollArea h={750} type="auto">
      {renderPokemons}
    </ScrollArea>
  )
}
