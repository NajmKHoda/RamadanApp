"use client";

import { useState, useEffect } from "react";
import PrayerTimes from "./PrayerTimes";
import EventList from "./EventList";

interface DayScheduleProps {
    day: "today" | "tomorrow" | "dayAfterTomorrow";
}

export default function DaySchedule({ day }: DayScheduleProps) {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const today = new Date("March 3, 2025");
        if (day === "tomorrow") {
            today.setDate(today.getDate() + 1);
        } else if (day === "dayAfterTomorrow") {
            today.setDate(today.getDate() + 2);
        }
        setDate(today);
    }, [day]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 border-b pb-2">
                {day === "today"
                    ? `Today, ${date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                      })}`
                    : day === "tomorrow"
                    ? `Tomorrow, ${date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                      })}`
                    : date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                      })}
            </h2>
            <PrayerTimes date={date} />
            <EventList date={date} />
        </div>
    );
}
