import React from "react";
import { Text, Title, Checkbox,Group } from "@mantine/core";

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
    <Group>
      {label}: {value ? <Checkbox checked /> : <Checkbox indeterminate />}
    </Group>
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

