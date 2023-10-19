import { Container, Flex, Title, Text } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { NavBar } from "@/components/NavBar"

export default function Home() {
  return (
    <Container fluid>
      <NavBar />
      <Flex
        className="h-[calc(100vh-50px)] "
        justify="center"
        align="center"
        direction="column"
      >
        <Text
          size="calc(5rem * var(--mantine-scale))"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "green", deg: 90 }}
        >
          PokeData
        </Text>

        <SearchBar />
      </Flex>
    </Container>
  )
}
