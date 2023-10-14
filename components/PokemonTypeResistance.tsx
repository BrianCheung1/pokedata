import React from "react";
import { Badge, Title } from "@mantine/core";
import { colors } from "@/libs/utils";

interface PokemonTypeResistanceProps {
  pokemon: {
    type_resistant?: string[];
  };
}

export const PokemonTypeResistance: React.FC<PokemonTypeResistanceProps> = ({
  pokemon: { type_resistant = [] },
}) => {
  const renderTypeResistances = () => {
    return type_resistant.sort().map((element: string) => (
      <Badge key={element} className="mr-2" color={colors[element.toLowerCase()]}>
        {element}
      </Badge>
    ));
  };

  return (
    <>
      <Title order={5}>Resistant To</Title>
      {renderTypeResistances().length ? renderTypeResistances() : <Badge>N/A</Badge>}
    </>
  );
};
