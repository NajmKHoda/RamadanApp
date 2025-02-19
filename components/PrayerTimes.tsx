"use client";

interface PrayerTimesProps {
    prayerTimes: {
        [key: string]: string;
    };
}

function convertTo12Hour(time24: string): string {
    // expects "HH:mm" format
    const [hourStr, minuteStr] = time24.split(":");
    const hour24 = Number.parseInt(hourStr);
    const ampm = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    return `${hour12}:${minuteStr} ${ampm}`;
}

export default function PrayerTimes({ prayerTimes }: PrayerTimesProps) {
    if (!prayerTimes || Object.keys(prayerTimes).length === 0) {
        return (
            <div className="mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                    Prayer Times
                </h3>
                <p className="text-gray-500">Prayer times not available</p>
            </div>
        );
    }

    return (
        <div className="mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
                Prayer Times
            </h3>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base border-b pb-2">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                    <li key={prayer} className="flex justify-between">
                        <span className="capitalize">
                            {prayer === "asrHanafi"
                                ? "Asr (Hanafi)"
                                : prayer === "asrShafi"
                                ? "Asr (Shafi'i)"
                                : prayer}
                        </span>
                        <span>{convertTo12Hour(time)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
