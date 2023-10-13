import { Text, Image, Stack, Title, Group, Table } from "@mantine/core"

interface PokemonCPRangeProps {
  pokemon: Record<string, any>
}

export const PokemonCPRange: React.FC<PokemonCPRangeProps> = ({
  pokemon: { cp_range },
}) => {
  const renderCP = cp_range?.map((cp: { level: number; range: string }) => (
    <Table.Tr key={cp.level}>
      <Table.Td>{cp.level}</Table.Td>
      <Table.Td align="right">{cp.range}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Level</Table.Th>
          <Table.Th className="flex justify-end items-end">CP</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody >{renderCP}</Table.Tbody>
    </Table>
  )
}
