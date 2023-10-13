import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container, Flex, Title } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { NavBar } from "@/components/NavBar"

export default function Home() {
  return (
    <Container fluid className="h-screen overflow-hidden">
      <NavBar />
      <Flex
        className="h-full"
        justify="center"
        align="center"
        direction="column"
      >
        <Title order={1}>PokeData</Title>
        <SearchBar />
      </Flex>
    </Container>
  )
}
