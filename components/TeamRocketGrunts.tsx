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
    <Grid.Col key={grunt.character.template} span={{ base: 12, md: 6, lg: 4 }}>
      <Card bg={darken(grunt?.character?.type?.name ? colors[grunt?.character?.type?.name?.toLowerCase()] : "blue", 0.7)}>
        <Text>{grunt.character.template}</Text>
        <Text>Gender: {grunt.character.gender === 0 ? "Female" : "Male"}</Text>
        <Text>Type: {grunt.character.type.name}</Text>
        <Divider my="sm" variant="dashed" />

        {grunt.lineup.team.map((row:any, index :number) => (
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
                  pokemonName={pokemon?.template
                    ?.replace("_NORMAL", "")
                    .toLowerCase()}
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
    <ScrollArea h={850}>
      <Grid justify="center" align="center">{renderGrunts}</Grid>
    </ScrollArea>
  )
}

