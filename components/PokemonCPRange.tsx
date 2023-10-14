import { Table } from "@mantine/core";

interface PokemonCP {
  level: number;
  range: string;
}

interface PokemonCPRangeProps {
  pokemon: {
    cp_range?: PokemonCP[];
  };
}

export const PokemonCPRange: React.FC<PokemonCPRangeProps> = ({
  pokemon: { cp_range },
}) => {
  const renderCP = cp_range?.map(({ level, range }) => (
    <Table.Tr key={level}>
      <Table.Td>{level}</Table.Td>
      <Table.Td align="right">{range}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Level</Table.Th>
          <Table.Th className="flex justify-end items-end">CP</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{renderCP}</Table.Tbody>
    </Table>
  );
};
