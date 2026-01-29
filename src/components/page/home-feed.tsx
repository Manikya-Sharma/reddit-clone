"use client";
import { useGetAllSubs } from "@/app/hooks/useGetAllSubs";
import { ShowFeed } from "./show-feed";

export default function HomeFeed({
  className,
  withEdit,
}: {
  className?: string;
  withEdit?: boolean;
}) {
  const { data, isLoading } = useGetAllSubs();
  const postIds = data?.result.flatMap((sub) => sub.posts ?? []);
  return (
    <div className={className ? className : "w-2xl mx-auto"}>
      <ShowFeed withEdit={withEdit} isLoading={isLoading} postIds={postIds} />
    </div>
  );
}
