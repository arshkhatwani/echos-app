import { useEffect } from "react";

export default function useScrollToBottom(
  element: HTMLDivElement | null,
  data: any,
) {
  const scrollToBottom = () => {
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
}
