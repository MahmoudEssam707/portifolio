import { useEffect, useState } from "react";

export default function useTypedRoles(roles: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!roles || roles.length === 0) {
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: number;

    const tick = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setText(currentRole.slice(0, charIndex));
        if (charIndex === currentRole.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, 2000);
          return;
        }
        timeoutId = window.setTimeout(tick, 90);
      } else {
        charIndex -= 1;
        setText(currentRole.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timeoutId = window.setTimeout(tick, 300);
          return;
        }
        timeoutId = window.setTimeout(tick, 60);
      }
    };

    tick();

    return () => window.clearTimeout(timeoutId);
  }, [roles]);

  return text;
}
