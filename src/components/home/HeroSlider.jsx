"use client";

import Link from "next/link";
import { BookOpen, Clock, Library } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { buttonVariants } from "@/components/ui/button";
import { LOAN_DAYS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Add a book, borrow a book, return a book",
    text: "BookNook is a small online library built on sharing. Find your next read in seconds.",
    Icon: BookOpen,
    background: "from-emerald-950 via-emerald-800 to-emerald-600",
  },
  {
    title: "A shelf that grows with every reader",
    text: "Members add their own books, so the library gets bigger every day. Add yours and share it.",
    Icon: Library,
    background: "from-slate-900 via-blue-900 to-blue-700",
  },
  {
    title: "Borrow for a few days, return in one click",
    text: `Every loan lasts ${LOAN_DAYS} days, and all your borrowed books stay in one simple list.`,
    Icon: Clock,
    background: "from-teal-950 via-teal-800 to-emerald-700",
  },
];

export default function HeroSlider() {
  return (
    <section className="container-page pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="overflow-hidden rounded-2xl"
        style={{
          "--swiper-theme-color": "#ffffff",
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        }}
      >
        {slides.map((slide) => {
          const Icon = slide.Icon;
          return (
            <SwiperSlide key={slide.title}>
              {/* Every slide has the same height */}
              <div
                className={cn(
                  "relative flex min-h-[26rem] items-center overflow-hidden bg-linear-to-br text-white sm:min-h-[30rem]",
                  slide.background
                )}
              >
                {/* Soft decorative circles */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 size-64 rounded-full bg-white/5" />

                <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-12 py-12 sm:px-16 md:grid-cols-[3fr_2fr] lg:px-20">
                  <div className="flex flex-col items-start gap-5">
                    <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                      {slide.title}
                    </h2>
                    <p className="max-w-xl text-base text-white/85 sm:text-lg">
                      {slide.text}
                    </p>
                    <Link
                      href="/books"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "bg-white text-emerald-950 hover:bg-white/90"
                      )}
                    >
                      Browse Books
                    </Link>
                  </div>

                  <div className="hidden justify-center md:flex">
                    <Icon
                      className="size-44 text-white/20 lg:size-56"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}