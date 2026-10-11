import { useEffect, useState } from "react";

/**
 * "21:14" in `timeZone`, refreshed every 20s. Null until mounted so the
 * prerendered HTML never contains a stale build-time clock.
 */
export default function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const update = () => setTime(format.format(new Date()));

    update();
    const id = window.setInterval(update, 20_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
