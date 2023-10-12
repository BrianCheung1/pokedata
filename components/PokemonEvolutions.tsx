import { Text, Grid, Image, Group, Title } from "@mantine/core"
import { capitalize } from "@/libs/utils"

interface PokemonEvolutionsProps {
  pokemon: Record<string, any>
}

export const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  pokemon: { pokemon_name, evolution_family },
}) => {
  const renderEvolutions = () => {
    if (!evolution_family || evolution_family.length === 0) {
      return null // Return null if no evolutions are present
    }

    return evolution_family.map((element: any) => (
      <Image
        key={element.sprite}
        src={element.sprite}
        w="auto"
        h={200}
        fit="contain"
        alt="Pokemon"
      />
    ))
  }

  return (
    <>
      <Title className="text-center" order={5}>{capitalize(pokemon_name)} Family</Title>
      <Group justify="center" align="center" grow wrap="nowrap">{renderEvolutions()}</Group>
    </>
  )
}
