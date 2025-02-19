"use client"

import { useState, useEffect } from "react"
import PrayerTimes from "./PrayerTimes"
import EventList from "./EventList"

interface DayScheduleProps {
  day: "today" | "tomorrow" | "dayAfterTomorrow"
}

export default function DaySchedule({ day }: DayScheduleProps) {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const today = new Date()
    if (day === "tomorrow") {
      today.setDate(today.getDate() + 1)
    } else if (day === "dayAfterTomorrow") {
      today.setDate(today.getDate() + 2)
    }
    setDate(today)
  }, [day])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
        {day === "today" ? "Today" : day === "tomorrow" ? "Tomorrow" : "Day After Tomorrow"}
      </h2>
      <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">{date.toDateString()}</p>
      <PrayerTimes date={date} />
      <EventList date={date} />
    </div>
  )
}

