import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"

export default function Home() {
  return (
    <Container fluid className="overflow-hidden">
      <ColorSchemeToggle />
      <SearchBar />
    </Container>
  )
}
