"use client"

import { useState, useEffect } from "react"

interface PrayerTimesProps {
  date: Date
}

interface PrayerTime {
  [key: string]: string
}

export default function PrayerTimes({ date }: PrayerTimesProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null)

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const response = await fetch(`/api/prayer-times?date=${date.toISOString()}`)
      const data = await response.json()
      setPrayerTimes(data)
    }

    fetchPrayerTimes()
  }, [date])

  if (!prayerTimes) {
    return <div className="text-center">Loading prayer times...</div>
  }

  return (
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-semibold mb-2">Prayer Times</h3>
      <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <li key={prayer} className="flex justify-between">
            <span className="capitalize">
              {prayer === "asrHanafi" ? "Asr (Hanafi)" : prayer === "asrShafi" ? "Asr (Shafi'i)" : prayer}
            </span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

