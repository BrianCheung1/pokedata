import { Table } from "@mantine/core"

interface PokemonMoves {
  pokemon: Record<string, any>
}

export const PokemonMoves: React.FC<PokemonMoves> = ({
  pokemon: { moves },
}) => {

  const renderFastMoves = moves?.fast_moves?.map((move: any, index: number) => (
    <Table.Tr
      key={move.name}
      style={index === 0 ? { backgroundColor: "#555" } : {}}
    >
      <Table.Td>{move.name}</Table.Td>
      <Table.Td>{move.dps}</Table.Td>
      <Table.Td>{move.dpe}</Table.Td>
      <Table.Td>{move.eps}</Table.Td>
      <Table.Td>N/A</Table.Td>
      <Table.Td>{move.type}</Table.Td>
    </Table.Tr>
  ))

  const renderEliteFastMoves = moves?.elite_fast_moves?.map(
    (move: any, index: number) => (
      <Table.Tr
        key={move.name}
        style={index === 0 ? { backgroundColor: "#555" } : {}}
      >
        <Table.Td>{move.name}</Table.Td>
        <Table.Td>{move.dps}</Table.Td>
        <Table.Td>{move.dpe}</Table.Td>
        <Table.Td>{move.eps}</Table.Td>
        <Table.Td>N/A</Table.Td>
        <Table.Td>{move.type}</Table.Td>
      </Table.Tr>
    )
  )

  const renderChargedMoves = moves?.charged_moves?.map(
    (move: any, index: number) => (
      <Table.Tr
        key={move.name}
        style={index === 0 ? { backgroundColor: "#555" } : {}}
      >
        <Table.Td>{move.name}</Table.Td>
        <Table.Td>{move.dps}</Table.Td>
        <Table.Td>{move.dpe}</Table.Td>
        <Table.Td>{move.eps}</Table.Td>
        <Table.Td>{move.total}</Table.Td>
        <Table.Td>{move.type}</Table.Td>
      </Table.Tr>
    )
  )

  const renderEliteChargedMoves = moves?.elite_charged_moves?.map(
    (move: any, index: number) => (
      <Table.Tr
        key={move.name}
        style={index === 0 ? { backgroundColor: "#555" } : {}}
      >
        <Table.Td>{move.name}</Table.Td>
        <Table.Td>{move.dps}</Table.Td>
        <Table.Td>{move.dpe}</Table.Td>
        <Table.Td>{move.eps}</Table.Td>
        <Table.Td>{move.total}</Table.Td>
        <Table.Td>{move.type}</Table.Td>
      </Table.Tr>
    )
  )

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table horizontalSpacing="md" captionSide="bottom" highlightOnHover>
        <Table.Caption>Highlighted Rows are the best moves </Table.Caption>
        <Table.Caption>
          DPS - Damage Per Second - 20% Extra DPS if same type
        </Table.Caption>
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
        <Table.Tbody>{renderFastMoves}</Table.Tbody>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{moves?.elite_fast_moves?.length > 0 && "Elite Fast Moves"}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderEliteFastMoves}</Table.Tbody>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Charged Moves</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderChargedMoves}</Table.Tbody>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{moves?.elite_charged_moves?.length > 0 && "Elite Charged Moves"}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{renderEliteChargedMoves}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
