import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement || document.body;
            const siblings = Array.from(
              parent.querySelectorAll<HTMLElement>(".reveal")
            );
            const index = siblings.indexOf(entry.target as HTMLElement);
            (entry.target as HTMLElement).style.transitionDelay = `${
              (index % 4) * 0.07
            }s`;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
