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
  Affix,
  Button,
  Transition,
  rem,
  Skeleton,
} from "@mantine/core"
import { colors } from "@/libs/utils"
import { capitalize } from "@/libs/utils"
import { IconArrowUp } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useWindowScroll } from "@mantine/hooks"

export const TeamRocketGrunts = () => {
  const { data, isLoading } = useGrunts()
  const [scroll, scrollTo] = useWindowScroll()
  const router = useRouter()

  if (!data) return null

  const renderGrunts = data.grunts.map(
    (grunt: { name: string; team: any[]; type: string }) => (
      <Grid.Col key={grunt.name} span={{ base: 12, md: 6, xl: 4 }}>
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
              <Group justify="space-evenly" className="mb-10" wrap="nowrap">
                {team.map((pokemon: { name: string; sprite: string }) => (
                  <Stack key={pokemon.name}>
                    <Image
                      src={pokemon.sprite}
                      // h={200}
                      h={100}
                      // w="auto"
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
    <Grid justify="center" align="stretch">
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Skeleton visible={isLoading}>{renderGrunts}</Skeleton>
    </Grid>
  )
}
