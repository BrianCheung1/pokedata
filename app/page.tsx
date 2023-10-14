import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container, Flex, Title } from "@mantine/core"
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
        <Title order={1}>PokeData</Title>
        <SearchBar />
      </Flex>
    </Container>
  )
}
