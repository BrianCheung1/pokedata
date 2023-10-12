import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { PokemonList } from "@/components/PokemonList"

export default function Home() {
  return (
    <Container fluid className="overflow-hidden">
      <ColorSchemeToggle />
      <SearchBar />
      <PokemonList />
    </Container>
  )
}
