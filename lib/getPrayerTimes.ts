import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

// Parameters for Shafi Asr calculation
const CALCULATION_PARAMS_SHAFI = CalculationMethod.NorthAmerica();
CALCULATION_PARAMS_SHAFI.madhab = 'shafi';

// Parameters for Hanafi Asr calculation
const CALCULATION_PARAMS_HANAFI = CalculationMethod.NorthAmerica();
CALCULATION_PARAMS_HANAFI.madhab = 'hanafi';

// Geographic coordinates
const UCLA_COORDINATES = new Coordinates(34.0722, -118.4427);

export type PrayerTimeData = ReturnType<typeof getPrayerTimes>;
export function getPrayerTimes(date: Date) {
    const prayerTimesShafi = new PrayerTimes(UCLA_COORDINATES, date, CALCULATION_PARAMS_SHAFI);
    const prayerTimesHanafi = new PrayerTimes(UCLA_COORDINATES, date, CALCULATION_PARAMS_HANAFI);

    return {
        fajr: prayerTimesShafi.fajr,
        sunrise: prayerTimesShafi.sunrise,
        dhuhr: prayerTimesShafi.dhuhr,
        asrShafi: prayerTimesShafi.asr,
        asrHanafi: prayerTimesHanafi.asr,
        maghrib: prayerTimesShafi.maghrib,
        isha: prayerTimesShafi.isha,
    };
}