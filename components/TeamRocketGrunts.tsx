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
} from "@mantine/core"
import { colors } from "@/libs/utils"
import { capitalize } from "@/libs/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const TeamRocketGrunts = () => {
  const { data, isLoading } = useGrunts()
  const router = useRouter()

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
          <Text>
            {grunt.name
              .replace("CHARACTER_", "")
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (match) => match.toUpperCase())}
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
              <Group justify="space-evenly" className="mb-10">
                {team.map((pokemon: { name: string; sprite: string }) => (
                  <Stack key={pokemon.name}>
                    <Image
                      src={pokemon.sprite}
                      // h={100}
                      w={100}
                      fit="contain"
                      alt="Pokemon"
                      fallbackSrc="/images/default-pokemon.jpg"
                      loading="lazy"
                      className="cursor-pointer"
                      onClick={() => router.push(`pokemons/${pokemon.name}`)}
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
