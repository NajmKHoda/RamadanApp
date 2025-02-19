"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DaySchedule from "@/components/DaySchedule";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const days = ["today", "tomorrow", "dayAfterTomorrow"];

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    UCLA MSA Ramadan Schedule
                </h1>
                {isClient &&
                    (isMobile ? (
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            centeredSlides={true}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mb-8"
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
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </main>
    );
}
