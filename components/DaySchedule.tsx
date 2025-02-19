"use client";

import { useState, useEffect } from "react";
import PrayerTimes from "./PrayerTimes";
import EventList from "./EventList";
import { BASE_DATE } from "@/constants/baseDate";

interface DayScheduleProps {
    day: "today" | "tomorrow" | "dayAfterTomorrow";
    prayerTimes: { [key: string]: string } | undefined;
    // optional baseDate prop to override the default BASE_DATE
    baseDate?: Date;
}

export default function DaySchedule({
    day,
    prayerTimes,
    baseDate,
}: DayScheduleProps) {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const base = baseDate ? new Date(baseDate) : new Date(BASE_DATE);
        if (day === "tomorrow") {
            base.setDate(base.getDate() + 1);
        } else if (day === "dayAfterTomorrow") {
            base.setDate(base.getDate() + 2);
        }
        setDate(base);
    }, [day, baseDate]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
            {
                // Compute prefixes based on actual current date
                // Normalize current date to midnight
            }
            {(() => {
                const normalizedCurrent = new Date();
                normalizedCurrent.setHours(0, 0, 0, 0);
                const normalizedTomorrow = new Date(normalizedCurrent);
                normalizedTomorrow.setDate(normalizedTomorrow.getDate() + 1);
                // normalize the schedule's date
                const normalizedDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                );
                let prefix = "";
                if (
                    day === "today" &&
                    normalizedDate.getTime() === normalizedCurrent.getTime()
                ) {
                    prefix = "Today, ";
                } else if (
                    day === "tomorrow" &&
                    normalizedDate.getTime() === normalizedTomorrow.getTime()
                ) {
                    prefix = "Tomorrow, ";
                }
                return (
                    <>
                        <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-1">
                            {prefix +
                                normalizedDate.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                        </h2>
                        <p className="text-s text-gray-500 border-b pb-2 md:mb-2">
                            {normalizedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                            })}
                        </p>
                    </>
                );
            })()}
            {prayerTimes ? (
                <PrayerTimes prayerTimes={prayerTimes} />
            ) : (
                <div className="text-center text-gray-500">
                    Prayer times not available
                </div>
            )}
            <EventList date={date} />
        </div>
    );
}
