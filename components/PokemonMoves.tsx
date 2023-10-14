import { Table } from "@mantine/core";

interface Move {
  name: string;
  dps: number;
  dpe: number;
  eps: number;
  total?: number;
  type: string;
}

interface PokemonMovesProps {
  pokemon: {
    moves?: {
      fast_moves?: Move[];
      elite_fast_moves?: Move[];
      charged_moves?: Move[];
      elite_charged_moves?: Move[];
    };
  };
}

const renderMoves = (moves?: Move[], elite?: boolean) => {
  if (!moves || moves.length === 0) {
    return null;
  }

  return moves.map((move, index) => (
    <Table.Tr
      key={move.name}
      style={index === 0 ? { backgroundColor: "#555" } : {}}
    >
      <Table.Td>{move.name}</Table.Td>
      <Table.Td>{move.dps}</Table.Td>
      <Table.Td>{move.dpe}</Table.Td>
      <Table.Td>{move.eps}</Table.Td>
      <Table.Td>{elite ? "N/A" : move.total}</Table.Td>
      <Table.Td>{move.type}</Table.Td>
    </Table.Tr>
  ));
};

export const PokemonMoves: React.FC<PokemonMovesProps> = ({ pokemon: { moves } }) => (
  <Table.ScrollContainer minWidth={500}>
    <Table horizontalSpacing="md" captionSide="bottom" highlightOnHover>
      <Table.Caption>Highlighted Rows are the best moves </Table.Caption>
      <Table.Caption>DPS - Damage Per Second - 20% Extra DPS if same type</Table.Caption>
      <Table.Caption>DPE - Damage Per Energy</Table.Caption>
      <Table.Caption>EPS - Energy Per Second</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Move name</Table.Th>
          <Table.Th>DPS</Table.Th>
          <Table.Th>DPE</Table.Th>
          <Table.Th>EPS</Table.Th>
          <Table.Th>DPS*DPE</Table.Th>
          <Table.Th>Move type</Table.Th>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Fast Moves</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{renderMoves(moves?.fast_moves)}</Table.Tbody>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{moves?.elite_fast_moves && moves?.elite_fast_moves?.length > 0 && "Elite Fast Moves"}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{renderMoves(moves?.elite_fast_moves, true)}</Table.Tbody>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Charged Moves</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{renderMoves(moves?.charged_moves)}</Table.Tbody>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{moves?.elite_charged_moves && moves?.elite_charged_moves?.length > 0  && "Elite Charged Moves"}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{renderMoves(moves?.elite_charged_moves, true)}</Table.Tbody>
    </Table>
  </Table.ScrollContainer>
);
