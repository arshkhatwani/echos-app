import { useEffect } from "react";

async function loadFlyonUI() {
  return import("flyonui/flyonui");
}

export default function useFlyonUI() {
  useEffect(() => {
    const initFlyonUI = async () => {
      await loadFlyonUI();
    };

    initFlyonUI();
  }, []);
}
