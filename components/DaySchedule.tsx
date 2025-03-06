"use client";

import { useState, useEffect, useMemo } from "react";
import PrayerTimesView from "./PrayerTimesView";
import EventList from "./EventList";
import { BASE_DATE } from "@/constants/baseDate";
import { getPrayerTimes } from '@/lib/getPrayerTimes';

interface DayScheduleProps {
    day: "today" | "tomorrow" | "dayAfterTomorrow";
    // optional baseDate prop to override the default BASE_DATE
    baseDate?: Date;
}

const HIJRI_FORMATTER = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
 });

export default function DaySchedule({
    day,
    baseDate,
}: DayScheduleProps) {
    const [date, setDate] = useState<Date>(new Date());
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [suhoorTimeLeft, setSuhoorTimeLeft] = useState<number>(0);

    const prayerTimes = useMemo(() => getPrayerTimes(date), [date]);
    const nextDayPrayerTimes = useMemo(() => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return getPrayerTimes(nextDay);
    }, [date]);

    useEffect(() => {
        const base = baseDate ? new Date(baseDate) : new Date(BASE_DATE);
        if (day === "tomorrow") {
            base.setDate(base.getDate() + 1);
        } else if (day === "dayAfterTomorrow") {
            base.setDate(base.getDate() + 2);
        }
        setDate(base);
    }, [day, baseDate]);

    // Compute normalized dates and Hijri date
    const normalizedCurrent = new Date();
    normalizedCurrent.setHours(0, 0, 0, 0);
    const normalizedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    const isToday = normalizedDate.getTime() === normalizedCurrent.getTime();
    const hijriDate = HIJRI_FORMATTER.format(date);

    // Determine prefix for header based on day prop
    let prefix = "";
    const normalizedTomorrow = new Date(normalizedCurrent);
    normalizedTomorrow.setDate(normalizedTomorrow.getDate() + 1);
    if (day === "today" && isToday) {
        prefix = "Today, ";
    } else if (
        day === "tomorrow" &&
        normalizedDate.getTime() === normalizedTomorrow.getTime()
    ) {
        prefix = "Tomorrow, ";
    }

    useEffect(() => {
        if (isToday) {
            function updateCountdown() {
                const diff = prayerTimes.maghrib.getTime() - new Date().getTime();
                setTimeLeft(Math.max(diff, 0));
            }

            updateCountdown();

            const intervalId = setInterval(updateCountdown, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isToday, prayerTimes, date]);

    // Updated suhoor countdown to use isha instead of maghrib
    useEffect(() => {
        if (isToday) {
            function updateSuhoorCountdown() {
                const now = new Date();

                // show suhoor countdown only if current time is after isha and before fajr
                if (now > prayerTimes.isha && now < nextDayPrayerTimes.fajr) {
                    const diff = nextDayPrayerTimes.fajr.getTime() - now.getTime();
                    setSuhoorTimeLeft(diff);
                } else {
                    setSuhoorTimeLeft(0);
                }
            }

            updateSuhoorCountdown();
            const intervalId = setInterval(updateSuhoorCountdown, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isToday, prayerTimes, nextDayPrayerTimes, date]);

    return (
        // Updated container with more pronounced rounded corners using rounded-xl
        <div
            className={`rounded-xl p-4 md:p-6 h-full ${
                isToday
                    ? "border-2 border-blue-500 shadow-lg bg-white"
                    : "bg-white shadow-md"
            }`}
        >
            <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-1">
                {prefix +
                    normalizedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
            </h2>
            <p className="text-xs text-gray-500">
                {normalizedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                })}
                {", "}
                {hijriDate}
            </p>
            {/* Dynamic Countdown Section for Maghrib */}
            {isToday && timeLeft > 0 && (
                <p className="text-xs text-blue-500 mt-2">
                    Time until Iftaar:{" "}
                    {timeLeft < 60000
                        ? `${Math.floor(timeLeft / 1000)}s`
                        : `${Math.floor(timeLeft / 3600000)}h ${Math.floor(
                              (timeLeft % 3600000) / 60000
                          )}m`}
                </p>
            )}
            {/* New: Countdown for Suhoor */}
            {isToday && suhoorTimeLeft > 0 && (
                <p className="text-xs text-purple-500 mt-2">
                    Time until Fajr:{" "}
                    {suhoorTimeLeft < 60000
                        ? `${Math.floor(suhoorTimeLeft / 1000)}s`
                        : `${Math.floor(
                              suhoorTimeLeft / 3600000
                          )}h ${Math.floor(
                              (suhoorTimeLeft % 3600000) / 60000
                          )}m`}
                </p>
            )}
            <p className="text-xs text-gray-500 mb-2 border-b pb-2 md:mb-2"></p>
            <PrayerTimesView prayerTimes={prayerTimes} />
            <EventList date={date} />
        </div>
    );
}
