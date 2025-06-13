"use client";
import { selectViewMode } from "@/redux/viewModeSlice";
import { useGetPortfolioQuery, useUpdateTemplateMutation } from "@/services/portfolioApi";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ResponsiveIframe({ username }: { username: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // This will force the iframe to reload by adding a timestamp to the URL
  const refreshIframe = () => {
    if (iframeRef.current) {
      // Add a timestamp to the URL to force reload
      iframeRef.current.src = `/${username}?t=${Date.now()}`;
    }
  };
  const viewMode = useSelector(selectViewMode);
  const { isFetching } = useGetPortfolioQuery();

  useEffect(() => {
    if (!isFetching) {
      refreshIframe();
    }
  }, [isFetching]);
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
