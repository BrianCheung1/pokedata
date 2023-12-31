import axios from "axios"
import { NextResponse } from "next/server"
import moment from "moment-timezone"

const eventsData =
  "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/events.json"

const leekData =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json"

//Returns list of events filtered into active and upcoming events
//Timezone will be based on the person accessing it
export async function GET(req: Request) {
  try {
    const [events, leekEvents] = await Promise.all([
      axios.get(eventsData),
      axios.get(leekData),
    ])
    const userTimezone = decodeURIComponent(req.url).split("=").pop() as string
    const currentDate = moment.tz(userTimezone)

    // Function to convert date strings to Date objects
    const parseDate = (dateString: string) => {
      const date = new Date(dateString)
      date.setSeconds(0)
      return date
    }

    // Create a map to store combined objects based on start time and end time
    const combinedObjectsMap = new Map()

    // Function to create a unique key based on start time and end time
    const createKey = (obj: { start: any; end: any; name: any }) =>
      `${parseDate(obj.start).toISOString()}-${parseDate(
        obj.end
      ).toISOString()}-${obj.name}`

    // Function to combine objects
    const combineObjects = (
      obj1: any,
      obj2: { extraData: any; image: string; link: string }
    ) => ({
      ...obj1,
      image: obj2.image,
      link: obj2.link,
      extraData: {
        ...obj2.extraData,
      },
    })

    //mapping through both datasets to see what matches depending on start and end time
    //if they have the same start and end time keys, leekEvents extradata will be added to map
    events.data.forEach((obj: any) => {
      const key = createKey(obj)
      if (combinedObjectsMap.has(key)) {
        const combinedObject = combineObjects(combinedObjectsMap.get(key), obj)
        combinedObjectsMap.set(key, combinedObject)
      } else {
        combinedObjectsMap.set(key, obj)
      }
    })

    leekEvents.data.forEach((obj: any) => {
      const key = createKey(obj)
      if (combinedObjectsMap.has(key)) {
        const combinedObject = combineObjects(combinedObjectsMap.get(key), obj)
        combinedObjectsMap.set(key, combinedObject)
      } else {
        combinedObjectsMap.set(key, obj)
      }
    })

    // Convert the map values back to an array
    const combinedObjectsArray = Array.from(combinedObjectsMap.values())

    //Filter events by active and upcoming
    const activeEvents = combinedObjectsArray
      .filter((event: { start: string; end: string }) => {
        const eventStartDate = new Date(event.start)
        const eventEndDate = new Date(event.end)

        // Check if the current date is within the event's start and end dates
        return (
          currentDate.isSameOrAfter(eventStartDate) &&
          currentDate.isSameOrBefore(eventEndDate)
        )
      })
      .sort(
        (a: { end: any }, b: { end: any }) =>
          new Date(a.end).getTime() - new Date(b.end).getTime()
      )

    const upcomingEvents = combinedObjectsArray
      .filter((event: { start: string }) => {
        const eventStartDate = new Date(event.start)

        // Check if the current date is before the event's start date
        return currentDate.isSameOrBefore(eventStartDate)
      })
      .sort(
        (a: { start: any }, b: { start: any }) =>
          new Date(a.start).getTime() - new Date(b.start).getTime()
      )

    return NextResponse.json(
      {
        msg: "Success",
        time: currentDate,
        timeformatted: currentDate.format(),
        timeZone: userTimezone,
        active_events: activeEvents,
        upcoming_events: upcomingEvents,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: "Error in Grunts GET" }, { status: 500 })
  }
}
