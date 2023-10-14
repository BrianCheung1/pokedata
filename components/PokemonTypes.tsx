import React from "react";
import { Badge, Title, Stack, Group } from "@mantine/core";
import { colors } from "@/libs/utils";

interface PokemonTypesProps {
  pokemon: {
    pokemon_types?: Record<string, string>;
  };
}

export const PokemonTypes: React.FC<PokemonTypesProps> = ({
  pokemon: { pokemon_types = {} },
}) => {
  const renderTypes = () => {
    return Object.entries(pokemon_types).map(([type, color]) => (
      <Badge key={type} color={colors[color]}>
        {color}
      </Badge>
    ));
  };

  return (
    <Stack justify="center" align="center">
      <Title order={5}>Type</Title>
      <Group gap="xs" justify="center" align="center">
        {renderTypes()}
      </Group>
    </Stack>
  );
};

