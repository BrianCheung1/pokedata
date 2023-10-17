import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ScrollArea,
  Flex,
  darken,
  TextInput,
  Pagination,
  Skeleton,
  Accordion,
  Title,
} from "@mantine/core"
import useEvents from "@/hooks/useEvents"
import { capitalize } from "@/libs/utils"

export const EventList = () => {
  const { data, isLoading } = useEvents()

  const formatTime = (days: number, hours: number, minutes: number) => {
    return days > 1 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`
  }

  const eventEnds = (startDate: string, endDate: string) => {
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)
    const currentTime = new Date()

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
      <Text size="sm" c="dimmed">
        {label} {formatTime(days, hours, minutes)}
      </Text>
    )
  }

  const renderEvent = (event: {
    name: string
    start: string
    end: string
    bonuses: [{ text: string; template: string }]
  }) => (
    <Accordion.Item key={event.name} value={event.name}>
      <Accordion.Control>
        {event.name}
        <Text size="sm" c="dimmed">
          End Date: {event.end}
        </Text>
        {eventEnds(event.start, event.end)}
      </Accordion.Control>
      <Accordion.Panel>
        <Card bg="none">
          <Text>
            {event.bonuses.length > 0 && `Bonuses:`}
            {event.bonuses?.map((bonus) => (
              <Text key={bonus.text} size="sm" c="dimmed">
                {bonus.text}
              </Text>
            ))}
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
      <Accordion> {renderActiveEvents}</Accordion>
      <Title>Upcoming Events</Title>
      <Accordion>{renderUpcomingEvents}</Accordion>
    </>
  )
}
