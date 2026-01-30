"use client";
import { useGetAllSubs } from "@/app/hooks/useGetAllSubs";
import type { posts } from "@/database/drizzle/schema";
import { ShowFeed } from "./show-feed";

export default function HomeFeed({
  className,
  withEdit,
  initialData,
}: {
  className?: string;
  withEdit?: boolean;
  initialData: Array<typeof posts.$inferSelect>;
}) {
  const { data, isLoading } = useGetAllSubs();
  const postIds = data?.result.flatMap((sub) => sub.posts ?? []);
  return (
    <div className={className ? className : "w-2xl mx-auto"}>
      <ShowFeed
        initialData={initialData}
        withEdit={withEdit}
        isLoading={isLoading}
        postIds={postIds}
      />
    </div>
  );
}
