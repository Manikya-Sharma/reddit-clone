"use client";
import { useGetAllSubs } from "@/app/hooks/useGetAllSubs";
import { ShowFeed } from "./show-feed";

export default function HomeFeed() {
  const { data, isLoading } = useGetAllSubs();
  const postIds = data?.result.flatMap((sub) => sub.posts ?? []);
  return (
    <div className="w-2xl mx-auto">
      <ShowFeed isLoading={isLoading} postIds={postIds} />
    </div>
  );
}
