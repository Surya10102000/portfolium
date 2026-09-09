"use client";
import { selectViewMode } from "@/redux/viewModeSlice";
import {
  TEMPLATE_UPDATE_CACHE_KEY,
  useGetPortfolioQuery,
  useUpdateTemplateMutation,
} from "@/services/portfolioApi";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ResponsiveIframe({ username }: { username: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewMode = useSelector(selectViewMode);
  const { isFetching } = useGetPortfolioQuery();
  // Shares mutation state with TemplateSelector via fixedCacheKey, so we know
  // the new template as soon as the mutation resolves instead of waiting for
  // the Portfolio-tag invalidation to refetch getPortfolioQuery.
  const [, { isSuccess: isTemplateUpdateSuccess, fulfilledTimeStamp }] =
    useUpdateTemplateMutation({ fixedCacheKey: TEMPLATE_UPDATE_CACHE_KEY });

  // Memoize the refresh function to prevent unnecessary recreations
  const refreshIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `/${username}?t=${Date.now()}`;
    }
  }, [username]); // Only recreate if username changes

  // Skips the getPortfolioQuery-driven refresh below that immediately
  // follows a template update, since we've already refreshed for it here.
  const skipNextFetchRefresh = useRef(false);

  useEffect(() => {
    if (isTemplateUpdateSuccess) {
      skipNextFetchRefresh.current = true;
      refreshIframe();
    }
    // fulfilledTimeStamp changes on every successful call, so this still
    // fires for a second template switch even though isSuccess stays true.
  }, [isTemplateUpdateSuccess, fulfilledTimeStamp, refreshIframe]);

  useEffect(() => {
    if (isFetching) return;
    if (skipNextFetchRefresh.current) {
      skipNextFetchRefresh.current = false;
      return;
    }
    refreshIframe();
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
