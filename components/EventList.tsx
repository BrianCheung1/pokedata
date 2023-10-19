import {
  Card,
  Text,
  Group,
  Accordion,
  Title,
  Stack,
  Image,
  Skeleton,
  Button,
} from "@mantine/core"
import useEvents from "@/hooks/useEvents"
import { useEffect, useState } from "react"
import { IconArrowRight } from "@tabler/icons-react"
import { ScrollUp } from "./ScrollUp"

export const EventList = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const { data, isLoading } = useEvents(userTimezone)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update the current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // 60000 milliseconds = 1 minute

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId)
  }, []) // The empty dependency array ensures that the effect runs only once on mount

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    const formattedDate = newDate
      .toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/,/g, "")

    return formattedDate
  }

  const formatTime = (days: number, hours: number, minutes: number) => {
    return days >= 1 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`
  }

  const eventEnds = (startDate: string, endDate: string) => {
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)

    const timeDifference =
      currentTime < startTime
        ? startTime.getTime() - currentTime.getTime()
        : endTime.getTime() - currentTime.getTime()
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )

    const label = currentTime < startTime ? "Starts in" : "Ends in"

    return (
      <div className="ml-auto flex flex-col items-center justify-center w-36">
        <Text size="sm" c="dimmed">
          {label}
        </Text>
        <Text size="sm" c="dimmed">
          {formatTime(days, hours, minutes)}
        </Text>
      </div>
    )
  }

  const renderEvent = (event: {
    name: string
    start: string
    end: string
    bonuses: [{ text: string; template: string }]
    extraData: any
    image: string
    link: string
  }) => (
    <Accordion.Item key={event.name} value={event.name}>
      <Accordion.Control>
        <Group wrap="nowrap">
          <Image src={event.image} alt="boss" fit="contain" w="20%"></Image>
          <div className="w-full">
            <Text>{event.name}</Text>
            <Text size="sm" c="dimmed">
              End Date: {formatDate(event.end)}
            </Text>
          </div>
          {eventEnds(event.start, event.end)}
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Card bg="none">
          <div>
            {event.bonuses?.length > 0 && `Bonuses:`}
            {event.bonuses?.map((bonus) => (
              <Text key={bonus.text} size="sm" c="dimmed">
                {bonus.text}
              </Text>
            ))}
            {event.extraData?.raidbattles?.bosses?.map(
              (
                boss: { image: string; canBeShiny: boolean; name: string },
                index: number
              ) => (
                <Stack key={boss.name} align="center">
                  <Group>
                    <Image
                      src={boss.image}
                      alt="boss"
                      fit="contain"
                      h={100}
                      w="auto"
                    />
                    {event.extraData?.raidbattles?.shinies?.[index] && (
                      <Image
                        src={event.extraData.raidbattles.shinies[index].image}
                        alt={`shiny-${index}`}
                        fit="contain"
                        h={100}
                        w="auto"
                      />
                    )}
                  </Group>
                  <Text>
                    Can be Shiny: {boss.canBeShiny ? "True" : "False"}
                  </Text>
                </Stack>
              )
            )}
            {event.extraData?.spotlight && (
              <div key={event.extraData.spotlight.name}>
                <Text size="sm" c="dimmed">
                  {event.extraData.spotlight.name}
                </Text>
                <Text size="sm" c="dimmed">
                  {event.extraData.spotlight.bonus}
                </Text>
                <Image
                  src={event.extraData.spotlight.image}
                  alt="spotlight"
                  fit="contain"
                  h={100}
                  w="auto"
                />
              </div>
            )}
            {event.extraData?.communityday && (
              <>
                {event.extraData.communityday.spawns?.map(
                  (spawn: { name: string; image: string }) => (
                    <div key={spawn.image}>
                      <Image
                        src={spawn.image}
                        alt="pokemon"
                        fit="contain"
                        h={100}
                        w="auto"
                      />
                      <Text key={spawn.name} size="sm" c="dimmed">
                        {spawn.name}
                      </Text>
                    </div>
                  )
                )}
                <Text size="sm" c="dimmed">
                  {event.extraData.communityday.bonusDisclaimers}
                </Text>
              </>
            )}

            <Button
              component="a"
              href={event.link}
              target="_blank"
              variant="light"
              rightSection={<IconArrowRight size={14} />}
            >
              More Info
            </Button>
          </div>
        </Card>
      </Accordion.Panel>
    </Accordion.Item>
  )

  const renderActiveEvents = data?.active_events?.map(renderEvent)
  const renderUpcomingEvents = data?.upcoming_events?.map(renderEvent)

  if (isLoading) {
    return <Skeleton visible={isLoading} h={1000}></Skeleton>
  }
  return (
    <>
      <ScrollUp />
      <Title>Active Events</Title>
      <Text size="sm" c="dimmed">
        Time Now: {formatDate(data?.time)}
      </Text>
      <Accordion> {renderActiveEvents} </Accordion>
      <Title>Upcoming Events</Title>
      <Accordion>{renderUpcomingEvents}</Accordion>
    </>
  )
}
