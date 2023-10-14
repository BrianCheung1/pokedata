import React from "react";
import { Text, Title } from "@mantine/core";

interface ShinyData {
  found_egg?: boolean;
  found_research?: boolean;
  found_wild?: boolean;
}

interface PokemonShinyProps {
  pokemon: {
    shiny?: ShinyData;
  };
}

export const PokemonShiny: React.FC<PokemonShinyProps> = ({
  pokemon: { shiny = {} },
}) => {
  const renderShinyInfo = (label: string, value?: boolean) => (
    <Text size="md" c="dimmed">
      {label}: {value ? "True" : "N/A"}
    </Text>
  );

  return (
    <>
      <Title order={5}>Shiny Rates</Title>
      {renderShinyInfo("Found in Egg", shiny.found_egg)}
      {renderShinyInfo("Found in Research", shiny.found_research)}
      {renderShinyInfo("Found in Wild", shiny.found_wild)}
    </>
  );
};

