import { useEffect, useState } from "react";

export const useKeyboard = () => {
  const [keys, setKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = new Set(prev);
        next.add(e.code);
        return next;
      });
    };

    const up = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const blur = () => {
      setKeys(new Set());
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  return keys;
};