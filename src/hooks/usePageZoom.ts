import { zoomLevel } from "zoom-level";
import { useEffect, useState } from "react";

declare var global: {
  window?: Window;
};

let win = global.window;
let pageZoomLevel = 1;
const callbacks: Array<(n: number) => void> = [];

if (win) {
  pageZoomLevel = zoomLevel(win);

  win.addEventListener(
    "resize",
    () => {
      pageZoomLevel = zoomLevel(win);

      callbacks.forEach(cb => cb(pageZoomLevel));
    },
    { passive: true }
  );
}

export default function usePageZoom(): number {
  const [zoom, setZoom] = useState(pageZoomLevel);

  useEffect(() => {
    callbacks.push(setZoom);

    return () => {
      const idx = callbacks.indexOf(setZoom);

      idx !== -1 && callbacks.splice(idx, 1);
    };
  }, []);

  return zoom;
}
