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
  Title,
  Skeleton,
} from "@mantine/core"
import { colors } from "@/libs/utils"
import { capitalize } from "@/libs/utils"
import { useRouter } from "next/navigation"
import { ScrollUp } from "./ScrollUp"

export const TeamRocketGrunts = () => {
  const { data, isLoading } = useGrunts()
  const router = useRouter()

  // Get an array of color keys
  const colorKeys = Object.keys(colors)

  // Generate a random index within the range of colorKeys
  const randomIndex = Math.floor(Math.random() * colorKeys.length)

  // Use the random key to access a color from the dictionary
  const randomColorKey = colorKeys[randomIndex]
  const randomColor = colors[randomColorKey]

  const renderGrunts = (grunt: {
    name: string
    team: any[]
    type: string
    quotes: string[]
  }) => (
    <Grid.Col key={grunt.name} span={{ base: 12, md: 6, xl: 4 }}>
      <Card
        bg={darken(
          grunt.type ? colors[grunt.type.toLowerCase()] : randomColor,
          0.7
        )}
        radius="md"
        withBorder
        h={750}
      >
        <Text>
          {grunt.name
            .replace("CHARACTER_", "")
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (match) => match.toUpperCase())}

          {grunt.quotes?.map((quote) => (
            <Text size="xs" c="dimmed" key={quote}>
              {quote}
            </Text>
          ))}
        </Text>
        <Text>
          Type: {grunt.type ? capitalize(grunt.type.toLowerCase()) : "N/A"}
        </Text>
        <Divider my="sm" variant="dashed" />

        {grunt.team.map((team, index) => (
          <Stack key={index}>
            <Title order={6} className="text-center">
              Possible Pokemon {index + 1}
            </Title>
            <Group justify="space-evenly" className="mb-10" wrap="nowrap">
              {team.map(
                (pokemon: { name: string; sprite: string; id: string }) => (
                  <Stack key={pokemon.name}>
                    <Image
                      src={pokemon.sprite}
                      h={100}
                      fit="contain"
                      alt="Pokemon"
                      fallbackSrc="/images/default-pokemon.jpg"
                      loading="lazy"
                      className="cursor-pointer"
                      onClick={() => router.push(`pokemons/${pokemon.id}`)}
                    />
                    <Text size="xs" c="dimmed" className="text-center">
                      {capitalize(pokemon.name)}
                    </Text>
                  </Stack>
                )
              )}
            </Group>
          </Stack>
        ))}
      </Card>
    </Grid.Col>
  )

  const renderAllGrunts = data?.grunts?.map(renderGrunts)
  const renderAllExecutive = data?.executive?.map(renderGrunts)

  if (isLoading) {
    return (
      <>
        <Skeleton height={800} radius="xl" />
      </>
    )
  }

  return (
    <Grid justify="center" align="stretch">
      <ScrollUp />
      {renderAllExecutive}
      {renderAllGrunts}
    </Grid>
  )
}
