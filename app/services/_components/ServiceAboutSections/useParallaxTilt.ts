import { useEffect } from "react";
import gsap from "gsap";

export function useParallaxTilt(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.innerWidth < 1024) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(el, { rotateX: -dy * 8, rotateY: dx * 8, transformPerspective: 1000, ease: "power2.out", duration: 0.4 });
      gsap.to(el.querySelectorAll(".wave-bar"), { x: dx * 10, y: dy * 10, stagger: 0.02, duration: 0.4 });
      el.querySelectorAll(".stacked-card").forEach((layer, i) => {
        gsap.to(layer, { x: dx * (i * 5), y: dy * (i * 5), duration: 0.4 });
      });
      const svgGroup = el.querySelector(".card3-svg-group");
      if (svgGroup) gsap.to(svgGroup, { x: dx * 15, y: dy * 15, duration: 0.4 });
    };
    const handleLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, ease: "elastic.out(1,0.5)", duration: 0.8 });
      gsap.to(el.querySelectorAll(".wave-bar,.stacked-card,.card3-svg-group"), { x: 0, y: 0, duration: 0.8 });
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);
}
