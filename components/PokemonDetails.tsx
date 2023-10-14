import {
  Card,
  Text,
  Skeleton,
  Grid,
  Title,
  Stack,
  Tabs,
  Divider,
  Group,
  Image,
} from "@mantine/core"
import usePokemon from "@/hooks/usePokemon"
import { capitalize } from "@/libs/utils"

interface PokemonDetailsProps {
  pokemonName: string
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemonName,
}) => {
  const { data: pokemonData, isLoading: pokemonLoading } =
    usePokemon(pokemonName)

  if (pokemonLoading) {
    return (
      <Skeleton>
        <Text size="xs" c="dimmed" className="text-center">
        Loading...
      </Text>
      </Skeleton>
    )
  }

  return (
    <Stack>
      <Image
        src={pokemonData?.sprite}
        h={100}
        w={100}
        fit="contain"
        alt="Pokemon"
        fallbackSrc="/images/default-pokemon.jpg"
        loading="lazy"
      />
      <Text size="xs" c="dimmed" className="text-center">
        {capitalize(pokemonData?.pokemon_name)}
      </Text>
    </Stack>
  )
}
