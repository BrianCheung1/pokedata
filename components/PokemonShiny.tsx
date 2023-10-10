import { Text, Title } from "@mantine/core"

interface PokemonShinyProps {
  pokemon: Record<string, any>
}

export const PokemonShiny: React.FC<PokemonShinyProps> = ({
  pokemon: { shiny },
}) => {
  return (
    <>
      <Title order={5}>Shiny Rates</Title>
      <Text size="md" c="dimmed">
        Found in Egg: {shiny?.found_egg ? "True" : "N/A"}
      </Text>
      <Text size="md" c="dimmed">
        Found in Research: {shiny?.found_research ? "True" : "N/A"}
      </Text>
      <Text size="md" c="dimmed">
        Found in Wild: {shiny?.found_wild ? "True" : "N/A"}
      </Text>
    </>
  )
}
