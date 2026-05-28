import { useEffect, useState } from "react";

type BackToTopProps = {
  targetId?: string;
};

export default function BackToTop({ targetId = "top" }: BackToTopProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      className={`back-to-top${show ? " show" : ""}`}
      href={`#${targetId}`}
      aria-label="Back to top"
    >
      UP
    </a>
  );
}
