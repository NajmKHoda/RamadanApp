"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DaySchedule from "@/components/DaySchedule";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "@/components/Footer";
import { useIsMobile } from '@/hooks/use-mobile';

export default function Home() {
    const formatDateForInput = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
        return adjustedDate.toISOString().split("T")[0];
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateInput, setDateInput] = useState(formatDateForInput(new Date()));

    const isMobile = useIsMobile();

    // Replace the previous debounced effect with this:
    useEffect(() => {
        if (dateInput && !isNaN(Date.parse(dateInput))) {
            if (isMobile) {
                setSelectedDate(new Date(dateInput + "T00:00:00"));
            } else {
                const timer = setTimeout(() => {
                    setSelectedDate(new Date(dateInput + "T00:00:00"));
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [dateInput, isMobile]);

    const days = ["today", "tomorrow", "dayAfterTomorrow"];

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-8">
                {true &&
                    (isMobile ? (
                        <>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                centeredSlides={true}
                                pagination={{
                                    clickable: true,
                                    el: ".swiper-pagination-bottom",
                                }}
                                modules={[Pagination]}
                                className="mb-4"
                            >
                                {days.map((day, index) => (
                                    <SwiperSlide key={index}>
                                        <DaySchedule
                                            day={
                                                day as
                                                    | "today"
                                                    | "tomorrow"
                                                    | "dayAfterTomorrow"
                                            }
                                            baseDate={selectedDate}
                                            
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-pagination-bottom flex justify-center"></div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {days.map((day, index) => (
                                <DaySchedule
                                    key={index}
                                    day={
                                        day as
                                            | "today"
                                            | "tomorrow"
                                            | "dayAfterTomorrow"
                                    }
                                    baseDate={selectedDate}
                                />
                            ))}
                        </div>
                    ))}
                <div className="mt-8 flex flex-col items-center">
                    <p className="mb-2 text-sm text-gray-700">
                        Select date for preview:
                    </p>
                    <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="p-2 border rounded"
                        min="2025-02-28"
                        max="2025-03-30"
                    />
                    {/* Button to return to today if selectedDate is not current day */}
                    {formatDateForInput(selectedDate) !==
                        formatDateForInput(new Date()) && (
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => {
                                const today = new Date();
                                setDateInput(formatDateForInput(today));
                            }}
                        >
                            Today
                        </button>
                    )}
                </div>
                <Footer />
            </div>
        </main>
    );
}
