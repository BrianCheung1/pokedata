import { Text, Image, Group, Title, Stack } from "@mantine/core";
import { capitalize } from "@/libs/utils";
import { useRouter } from "next/navigation";

interface PokemonEvolutionsProps {
  pokemon: Record<string, any>;
}

export const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  pokemon: { pokemon_name, evolution_family },
}) => {
  const router = useRouter()
  const renderEvolutions = () => {
    if (!evolution_family || evolution_family.length === 0) {
      return null; // Return null if no evolutions are present
    }

    return evolution_family.map((element: any) => (
      <Stack key={element.sprite} align="center">
        <Image
          src={element.sprite}
          w="auto"
          h={200}
          fit="contain"
          alt="Pokemon"
          fallbackSrc="/images/default-pokemon.jpg"
          className="cursor-pointer"
          onClick={()=> router.push(element.name)}
        />
        <Text size="xs" c="dimmed" className="text-center">
          {capitalize(element.name)}
        </Text>
      </Stack>
    ));
  };

  return (
    <>
      <Title className="text-center" order={5}>
        {capitalize(pokemon_name)} Family
      </Title>
      <Group justify="space-around" align="center">
        {renderEvolutions()}
      </Group>
    </>
  );
};
