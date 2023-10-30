import { Container, Flex, Title, Text, Stack } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { NavBar } from "@/components/NavBar"
import { Info } from "@/components/Info"

export default function Home() {
  return (
    <Container fluid>
      <NavBar />
      <Stack align="center" justify="center" className="h-[calc(100vh-100px)]">
        <Text
          size="calc(5rem * var(--mantine-scale))"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "green", deg: 90 }}
        >
          PokeData
        </Text>
        <SearchBar />
        <Info />
      </Stack>
    </Container>
  )
}
