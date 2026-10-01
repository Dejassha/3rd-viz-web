"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        particlesJS: any;
    }
}

export default function ParticlesBackground() {
    useEffect(() => {
        if (!window.particlesJS) return;

        window.particlesJS("particles-js", {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 2678.219771563607,
                    },
                },
                color: {
                    value: "#661bcb",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                },
                opacity: {
                    value: 0.4,
                    random: true,
                },
                size: {
                    value: 8,
                    random: true,
                },
                line_linked: {
                    enable: false,
                },
                move: {
                    enable: true,
                    speed: 4,
                    direction: "bottom",
                    out_mode: "out",
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    resize: true,
                },
                modes: {
                },
            },
            retina_detect: true,
        });
    }, []);

    return (
        <div
            id="particles-js"
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000000",
            }}
            className="absolute inset-0 -z-10 pointer-events-none"
        />
    );
}