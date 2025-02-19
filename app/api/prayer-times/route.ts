import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")

  if (!date) {
    return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
  }

  const apiUrl = `http://api.aladhan.com/v1/timings/${date}?latitude=34.0689&longitude=-118.4452&method=2`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const timings = data.data.timings

    // Fetch Hanafi Asr time
    const hanafiApiUrl = `http://api.aladhan.com/v1/timings/${date}?latitude=34.0689&longitude=-118.4452&method=1`
    const hanafiResponse = await fetch(hanafiApiUrl)
    const hanafiData = await hanafiResponse.json()
    const hanafiAsrTime = hanafiData.data.timings.Asr

    return NextResponse.json({
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asrShafi: timings.Asr,
      asrHanafi: hanafiAsrTime,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
    })
  } catch (error) {
    console.error("Error fetching prayer times:", error)
    return NextResponse.json({ error: "Failed to fetch prayer times" }, { status: 500 })
  }
}

