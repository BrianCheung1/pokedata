import axios from "axios"
import { NextResponse } from "next/server"

const eventsData =
  "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/events.json"

export async function GET(req: Request) {
  try {
    const events = await axios.get(eventsData)

    const currentDate = new Date()

    const activeEvents = events.data
      .filter((event: { start: string; end: string }) => {
        const eventStartDate = new Date(event.start)
        const eventEndDate = new Date(event.end)

        // Check if the current date is within the event's start and end dates
        return currentDate >= eventStartDate && currentDate <= eventEndDate
      })
      .sort(
        (a: { end: any }, b: { end: any }) =>
          new Date(a.end).getTime() - new Date(b.end).getTime()
      )

    const upcomingEvents = events.data
      .filter((event: { start: string }) => {
        const eventStartDate = new Date(event.start)

        // Check if the current date is before the event's start date
        return currentDate < eventStartDate
      })
      .sort(
        (a: { end: any }, b: { end: any }) =>
          new Date(a.end).getTime() - new Date(b.end).getTime()
      )

    return NextResponse.json(
      {
        msg: "Success",
        active_events: activeEvents,
        upcoming_events: upcomingEvents,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: "Error in Grunts GET" }, { status: 500 })
  }
}
