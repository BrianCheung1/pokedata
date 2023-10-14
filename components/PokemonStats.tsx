import React from "react";
import { Text, Title } from "@mantine/core";

interface PokemonStatsProps {
  pokemon: {
    pokemon_stats?: {
      max_cp?: number;
      base_attack?: number;
      base_defense?: number;
      base_stamina?: number;
    };
  };
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({
  pokemon: { pokemon_stats = {} },
}) => {
  const { max_cp, base_attack, base_defense, base_stamina } = pokemon_stats;

  return (
    <>
      <Title order={5}>Pokemon Stats</Title>
      <Text size="md" c="dimmed">
        Max CP: {max_cp}
      </Text>
      <Text size="md" c="dimmed">
        Base Attack: {base_attack}
      </Text>
      <Text size="md" c="dimmed">
        Base Defense: {base_defense}
      </Text>
      <Text size="md" c="dimmed">
        Base Stamina: {base_stamina}
      </Text>
    </>
  );
};
