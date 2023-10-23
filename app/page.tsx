import { Container, Flex, Title, Text } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { NavBar } from "@/components/NavBar"
import { Info } from "@/components/Info"

export default function Home() {
  return (
    <Container fluid className="w-full">
      <Flex
        className="h-[calc(100vh-100px)]"
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
        <NavBar />
        <SearchBar />
        <Info />
      </Flex>
    </Container>
  )
}
