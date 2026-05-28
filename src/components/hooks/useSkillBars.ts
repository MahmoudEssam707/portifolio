import { useEffect } from "react";

type SkillBarTarget = {
  current: HTMLElement | null;
};

export default function useSkillBars(ref: SkillBarTarget) {
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          const bars = node.querySelectorAll<HTMLElement>(".skill-bar-fill");
          bars.forEach((bar) => {
            const width = bar.dataset.w || "0";
            bar.style.width = `${width}%`;
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);
}
