"use client";

import { PrayerTimeData } from '@/lib/getPrayerTimes';

interface PrayerTimesViewProps {
    prayerTimes: PrayerTimeData;
}

// Formatter for salah times in Los Angeles (time-zone aware)
const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', timeZone: 'America/Los_Angeles' });

type PrayerId = keyof PrayerTimeData;
const prayerNameLookup: Record<PrayerId, string> = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asrShafi: 'Asr (Shafi)',
    asrHanafi: 'Asr (Hanafi)',
    maghrib: 'Maghrib',
    isha: 'Isha',
}

export default function PrayerTimesView({ prayerTimes }: PrayerTimesViewProps) {
    return (
        <div className="mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
                Prayer Times
            </h3>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base border-b pb-2">
                {Object.entries(prayerTimes).map(([prayerId, time]) => (
                    <li key={prayerId} className="flex justify-between">
                        <span className="capitalize">
                            {prayerNameLookup[prayerId as PrayerId]}
                        </span>
                        <span>{TIME_FORMATTER.format(time)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
