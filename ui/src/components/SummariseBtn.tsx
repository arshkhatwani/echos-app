import { useAtom } from "jotai";
import { useState, useTransition } from "react";
import { ai } from "../api/ai";
import { accessTokenAtom } from "../store/atoms";
import TextSkeleton from "./Loading/TextSkeleton";

export default function SummariseBtn({ message }: { message: string }) {
  const [accessToken] = useAtom(accessTokenAtom);
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState("");

  const handleClick = () => {
    if (isPending) return;

    startTransition(async () => {
      const response = await ai.getSummarization(
        message,
        accessToken as string,
      );
      startTransition(() => setSummary(response.summary));
    });
  };

  return (
    <div className="mt-1">
      {!isPending ? (
        summary.length == 0 ? (
          <button
            onClick={handleClick}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            Summarise
          </button>
        ) : (
          <div>
            <p className="text-sm font-bold italic">Summary using AI:</p>
            <p className="text-sm">{summary}</p>
          </div>
        )
      ) : (
        <TextSkeleton />
      )}
    </div>
  );
}
