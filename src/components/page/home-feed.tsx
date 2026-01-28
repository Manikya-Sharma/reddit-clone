"use client";
import { useGetUser } from "@/app/hooks/useGetUser";
import { useGetSubs } from "@/app/hooks/useGetSubs";
import { ShowFeed } from "./show-feed";
import { subs } from "@/database/drizzle/schema";

export default function HomeFeed() {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const subsResult = useGetSubs(user?.subs);
  const userSubs = subsResult.map((sub) => sub.data);
  const isSubsLoading = subsResult.some((sub) => sub.isLoading);
  const postIds = userSubs
    .filter(
      (sub): sub is { sub: typeof subs.$inferSelect } =>
        sub !== undefined && sub !== null,
    )
    .flatMap((sub) => sub?.sub.posts ?? []);
  return <ShowFeed postIds={postIds} />;
}
