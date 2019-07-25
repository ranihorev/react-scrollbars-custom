import usePageZoom from "./usePageZoom";
import { useEffect, useState } from "react";

declare var global: {
  document?: Document;
};

const doc = global.document;

// 9973 is simple so it is better in cases when zoom level makes scrollbar width float
const checkElementStyle =
  "display:block;position:absolute;width:100px;height:100px;top:-9973px;left:9973px;overflow:scroll;";

function getScrollbarWidth(): number {
  if (!doc) {
    return 0;
  }

  const el = doc.createElement("div");
  el.setAttribute("style", checkElementStyle);

  doc.body.appendChild(el);
  const rect = el.getBoundingClientRect();
  const sbw = rect.width - el.clientWidth;
  doc.body.removeChild(el);

  return sbw;
}

export default function useScrollbarWidth(): number {
  const zoomLevel = usePageZoom();
  const [sbw, setSbw] = useState(getScrollbarWidth);

  useEffect(() => {
    setSbw(getScrollbarWidth);
  }, [zoomLevel]);

  return sbw;
}
