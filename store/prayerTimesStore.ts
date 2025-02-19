import { create } from "zustand";

interface PrayerTime {
    [key: string]: string;
}

interface PrayerTimesState {
    prayerTimes: PrayerTime[];
    loading: boolean;
    error: string | null;
    fetchPrayerTimes: (startDate: Date) => Promise<void>;
}

function formatDateForAPI(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export const usePrayerTimesStore = create<PrayerTimesState>()((set, get) => ({
    prayerTimes: [],
    loading: false,
    error: null,
    fetchPrayerTimes: async (startDate: Date) => {
        set({ loading: true, error: null });
        try {
            // Fetch for three dates
            const dates = [
                startDate,
                new Date(startDate.getTime() + 86400000),
                new Date(startDate.getTime() + 172800000),
            ];

            const promises = dates.map((date) =>
                fetch(`/api/prayer-times?date=${formatDateForAPI(date)}`).then(
                    (res) => {
                        if (!res.ok) {
                            throw new Error("Failed to fetch prayer times");
                        }
                        return res.json();
                    }
                )
            );

            const results = await Promise.all(promises);
            set({ prayerTimes: results, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
}));
