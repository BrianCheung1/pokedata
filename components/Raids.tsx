import {
  Card,
  Text,
  Group,
  Title,
  Skeleton,
  Image,
  Grid,
  Badge,
  darken,
} from "@mantine/core"
import useRaids from "@/hooks/useRaids"
import { useRouter } from "next/navigation"
import { colors } from "@/libs/utils"
import { ScrollUp } from "./ScrollUp"

export const Raids = () => {
  const { data, isLoading } = useRaids()
  const router = useRouter()

  const RenderRaidIcon = () => (
    <Image src="/images/raid_icon.webp" alt="raid" h={50} w={50} />
  )

  const RenderRaidGroup = ({ count }: { count: number }) => (
    <Group gap="xs" className="mb-1">
      {[...Array(count)].map((_, index) => (
        <RenderRaidIcon key={index} />
      ))}
    </Group>
  )

  function extractFirstNumber(url: string) {
    const match = url.match(/\d+/)
    return match ? parseInt(match[0]) : null
  }

  const renderRaids = (raid: { name: string; types: any; image: string }) => (
    <Grid.Col key={raid.name} span="auto">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="mb-2"
        bg={darken(colors[raid.types[0].name], 0.7)}
        h={300}
      >
        <div className="flex justify-center">
          <Image
            src={raid.image}
            alt="raid"
            w={200}
            fit="contain"
            onClick={() => {
              router.push(`/pokemons/${extractFirstNumber(raid.image)}`)
            }}
            className="cursor-pointer"
          />
        </div>

        <Group wrap="nowrap" justify="space-between">
          {raid.name}
          <Group gap="xs">
            {raid.types.map((type: { name: string }) => {
              return (
                <Badge key={type.name} color={colors[type.name]}>
                  {type.name}
                </Badge>
              )
            })}
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  )

  const renderTier1Raids = data?.tier_1?.map(renderRaids)
  const renderTier2Raids = data?.tier_2?.map(renderRaids)
  const renderTier3Raids = data?.tier_3?.map(renderRaids)
  const renderTier4Raids = data?.tier_4?.map(renderRaids)
  const renderTier5Raids = data?.tier_5?.map(renderRaids)
  const renderTierMegaRaids = data?.mega?.map(renderRaids)

  if (isLoading) {
    return <Skeleton visible={isLoading} h={1000}></Skeleton>
  }
  return (
    <>
      <ScrollUp />
      <Title>Active Raids</Title>

      {renderTier1Raids.length > 0 && <RenderRaidGroup count={1} />}
      <Grid className="mb-5"> {renderTier1Raids} </Grid>
      {renderTier2Raids.length > 0 && <RenderRaidGroup count={2} />}
      <Grid className="mb-5"> {renderTier2Raids} </Grid>
      {renderTier3Raids.length > 0 && <RenderRaidGroup count={3} />}
      <Grid className="mb-5"> {renderTier3Raids} </Grid>
      {renderTier4Raids.length > 0 && <RenderRaidGroup count={4} />}
      <Grid className="mb-5"> {renderTier4Raids} </Grid>
      {renderTier5Raids.length > 0 && <RenderRaidGroup count={5} />}
      <Grid className="mb-5"> {renderTier5Raids} </Grid>
      <Image
        src="/images/mega_raid_icon.png"
        alt="mega"
        h={50}
        w={50}
        className="mb-1"
      />
      <Grid className="mb-5"> {renderTierMegaRaids} </Grid>
    </>
  )
}
