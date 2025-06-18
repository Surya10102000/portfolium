"use client";
import { selectViewMode } from "@/redux/viewModeSlice";
import { useGetPortfolioQuery } from "@/services/portfolioApi";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ResponsiveIframe({ username }: { username: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewMode = useSelector(selectViewMode);
  const { isFetching } = useGetPortfolioQuery();

  // Memoize the refresh function to prevent unnecessary recreations
  const refreshIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `/${username}?t=${Date.now()}`;
    }
  }, [username]); // Only recreate if username changes

  useEffect(() => {
    if (!isFetching) {
      refreshIframe();
    }
  }, [isFetching, refreshIframe]); // Now stable dependencies

  return (
    <div
      className={`relative border rounded-lg overflow-hidden max-w-[100vw] w-full h-[80vh] mx-auto
      ${viewMode === "mobile" ? "md:max-w-[600px]" : "w-full "}
    `}
    >
      <iframe
        ref={iframeRef}
        src={`/${username}`}
        className="absolute top-0 left-0 w-full h-full border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
}
