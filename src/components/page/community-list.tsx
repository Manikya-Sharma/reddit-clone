"use client";

import Image from "next/image";
import { useGetSubs } from "@/app/hooks/useGetSubs";
import { useGetUser } from "@/app/hooks/useGetUser";
import type { subs } from "@/database/drizzle/schema";
import WithTooltip from "./with-tooltip";
import { useLeaveSub } from "@/app/hooks/useLeaveSub";
import { useQueryClient } from "@tanstack/react-query";

export default function CommunityList() {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const subsResult = useGetSubs(user?.subs);
  const userSubs = subsResult.map((sub) => sub.data);
  const isLoadingSubs = subsResult.some((sub) => sub.isLoading);
  const queryClient = useQueryClient();
  const { mutate: leaveSub, isPending } = useLeaveSub({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
  return (
    <ul className="flex flex-col gap-2">
      {userSubs
        .filter(
          (sub): sub is { sub: typeof subs.$inferSelect } => sub !== undefined,
        )
        .map(({ sub }) => (
          <li key={sub.id} className="flex">
            <a href="/" className="flex gap-2 group">
              <Image
                src="/icons/outline-logo.svg"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm group-hover:text-blue-400">
                  {sub.title}
                </span>
                <span className="text-xs text-neutral-400">
                  {sub.description?.slice(0, 30)}
                </span>
              </div>
            </a>
            <div className="flex gap-2 items-center ml-auto">
              <WithTooltip tooltipText={`Favourite r/${sub.title}`}>
                <Image
                  src={"/icons/star-icon.svg"}
                  width={16}
                  height={16}
                  alt="star"
                />
              </WithTooltip>
              <WithTooltip tooltipText={`Leave r/${sub.title}`}>
                <button
                  type="button"
                  className="rounded-full border-neutral-400 border hover:border-white cursor-pointer px-4 py-2 text-xs"
                  disabled={isPending}
                  onClick={() => {
                    leaveSub({ userId: user?.id, subId: sub.id });
                  }}
                >
                  Joined
                </button>
              </WithTooltip>
            </div>
          </li>
        ))}
    </ul>
  );
}
