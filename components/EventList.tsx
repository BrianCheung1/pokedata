import {
  Card,
  Text,
  Group,
  Accordion,
  Title,
  Stack,
  Image,
} from "@mantine/core"
import useEvents from "@/hooks/useEvents"
import { useEffect, useState } from "react"

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
      <div className="ml-auto mr-5 flex flex-col items-center justify-center">
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
  }) => (
    <Accordion.Item key={event.name} value={event.name}>
      <Accordion.Control>
        <Group wrap="nowrap">
          <div>
            {event.name}
            <Text size="sm" c="dimmed">
              End Date: {formatDate(event.end)}
            </Text>
          </div>
          {eventEnds(event.start, event.end)}
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Card bg="none">
          <Text>
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
              <>
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
              </>
            )}
            {event.extraData?.communityday && (
              <>
                {event.extraData.communityday.spawns?.map(
                  (spawn: { name: string }) => (
                    <Text key={spawn.name} size="sm" c="dimmed">
                      {spawn.name}
                    </Text>
                  )
                )}
                <Text size="sm" c="dimmed">
                  {event.extraData.communityday.bonusDisclaimers}
                </Text>
              </>
            )}
            {!event.bonuses && !event.extraData && (
              <Text size="sm" c="dimmed">
                N/A
              </Text>
            )}
          </Text>
        </Card>
      </Accordion.Panel>
    </Accordion.Item>
  )

  const renderActiveEvents = data?.active_events?.map(renderEvent)
  const renderUpcomingEvents = data?.upcoming_events?.map(renderEvent)

  return (
    <>
      <Title>Active Events</Title>
      <Text>{data?.time}</Text>
      <Text>{data?.timeZone}</Text>
      <Text>{userTimezone}</Text>
      <Accordion> {renderActiveEvents} </Accordion>
      <Title>Upcoming Events</Title>
      <Accordion>{renderUpcomingEvents}</Accordion>
    </>
  )
}
