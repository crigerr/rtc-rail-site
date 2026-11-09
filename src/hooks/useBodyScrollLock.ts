import { useEffect } from "react";

let lockCount = 0;

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    document.body.dataset.scrollLocked = "true";

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        delete document.body.dataset.scrollLocked;
      }
    };
  }, [locked]);
}
