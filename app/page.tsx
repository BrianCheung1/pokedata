import { SearchBar } from "@/components/SearchBar"
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container } from "@mantine/core"

export default function Home() {
  return (
    <Container fluid className="overflow-hidden">
      <ColorSchemeToggle />
      <SearchBar />
    </Container>
  )
}
