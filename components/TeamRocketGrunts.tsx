import useGrunts from "@/hooks/UseGrunts"
import {
  Card,
  Text,
  Grid,
  Stack,
  Divider,
  Group,
  ScrollArea,
  darken
} from "@mantine/core"
import { PokemonDetails } from "./PokemonDetails"
import { colors } from "@/libs/utils"

export const TeamRocketGrunts = () => {
  const { data, isLoading } = useGrunts()

  const renderGrunts = data?.grunts?.map((grunt:any) => (
    <Grid.Col key={grunt.name} span={{ base: 12, md: 6, lg: 4 }}>
      <Card bg={darken(grunt?.type ? colors[grunt?.type?.toLowerCase()] : "blue", 0.7)} withBorder>
        <Text>{grunt.name}</Text>
        <Text>Type: {grunt?.type}</Text>
        <Divider my="sm" variant="dashed" />

        {grunt.team.map((row:any, index :number) => (
          <Stack key={index} align="center" gap="xs" justify="center">
            <Divider
              my="xs"
              label={`Pokemon #${index + 1}`}
              labelPosition="center"
            />
            <Group align="center" justify="center">
              {row.map((pokemon:any) => (
                <PokemonDetails
                  key={pokemon.id}
                  pokemonName={pokemon?.name}
                />
              ))}
            </Group>
          </Stack>
        ))}
      </Card>
    </Grid.Col>
  ))

  if(isLoading){
    return null
  }

  return (
      <Grid justify="center" align="center">{renderGrunts}</Grid>
  )
}

