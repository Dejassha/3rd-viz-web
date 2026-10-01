"use client";

import { useEffect } from "react";
import { circles } from "../data";
import Image from "next/image";

export default function MobileProcess() {
    useEffect(() => {
        const items = document.querySelectorAll(".mobile-step");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.3 }
        );

        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="container mx-auto text-white w-full py-16 flex flex-col items-center">

            <div className="w-full max-w-96 space-y-12">
                {circles.map((c) => (
                    <div
                        key={c.id}
                        className="flex flex-col items-center text-center translate-y-10 mobile-step"
                    >
                        <div
                            className="relative w-24 h-24 rounded-full bg-[#1a1a1a] border flex items-center justify-center"
                            style={{ borderColor: c.color }}
                        >
                            <Image
                                src={c.img}
                                alt={c.label}
                                sizes="56px"
                                className="object-contain"
                            />
                        </div>

                        <h2
                            className="text-2xl font-semibold mt-4"
                            style={{ color: c.color }}
                        >
                            {c.label}
                        </h2>

                        <p className="text-gray-300 text-sm leading-relaxed mt-2 font-outfit">
                            {c.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}