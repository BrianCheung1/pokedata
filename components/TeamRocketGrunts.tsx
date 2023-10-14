import useGrunts from "@/hooks/UseGrunts"
import {
  Card,
  Text,
  Grid,
  Stack,
  Divider,
  Group,
  darken,
  Image,
} from "@mantine/core"
import { colors } from "@/libs/utils"
import { capitalize } from "@/libs/utils"

export const TeamRocketGrunts = () => {
  const { data, isLoading } = useGrunts()

  if (!data || isLoading) return null

  const renderGrunts = data.grunts.map(
    (grunt: { name: string; team: any[]; type: string }) => (
      <Grid.Col key={grunt.name} span={{ base: 12, md: 6, lg: 4 }}>
        <Card
          bg={darken(
            grunt.type ? colors[grunt.type.toLowerCase()] : "blue",
            0.7
          )}
          withBorder
        >
          <Text>{grunt.name}</Text>
          <Text>Type: {grunt.type}</Text>
          <Divider my="sm" variant="dashed" />

          {grunt.team.map((team, index) => (
            <Stack key={index} align="center" gap="xs" justify="center">
              <Divider
                my="xs"
                label={`Pokemon #${index + 1}`}
                labelPosition="center"
              />
              <Group align="center" justify="center">
                {team.map((pokemon: { name: string; sprite: string }) => (
                  <Stack key={pokemon.name}>
                    <Image
                      src={pokemon.sprite}
                      h={100}
                      w={100}
                      fit="contain"
                      alt="Pokemon"
                      fallbackSrc="/images/default-pokemon.jpg"
                      loading="lazy"
                    />
                    <Text size="xs" c="dimmed" className="text-center">
                      {capitalize(pokemon.name)}
                    </Text>
                  </Stack>
                ))}
              </Group>
            </Stack>
          ))}
        </Card>
      </Grid.Col>
    )
  )

  return (
    <Grid justify="center" align="center">
      {renderGrunts}
    </Grid>
  )
}
