import React from "react";
import { Badge, Title } from "@mantine/core";
import { colors } from "@/libs/utils";

interface PokemonTypeVulnerableProps {
  pokemon: {
    type_vulnerable?: string[];
  };
}

export const PokemonTypeVulnerable: React.FC<PokemonTypeVulnerableProps> = ({
  pokemon: { type_vulnerable = [] },
}) => {
  const renderTypeVulnerable = () => {
    return type_vulnerable
      .sort()
      .map((element: string) => (
        <Badge key={element} className="mr-2" color={colors[element.toLowerCase()]}>
          {element}
        </Badge>
      ));
  };

  return (
    <>
      {type_vulnerable.length > 0 && (
        <>
          <Title order={5}>Vulnerable To</Title>
          {renderTypeVulnerable()}
        </>
      )}
    </>
  );
};

