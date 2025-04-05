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

    setTimeout(() => {
      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === "function"
      ) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, []);
}
