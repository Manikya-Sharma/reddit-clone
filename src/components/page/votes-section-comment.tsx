"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useGetCommentById } from "@/app/hooks/useGetCommentById";
import { useGetUser } from "@/app/hooks/useGetUser";
import { cn } from "@/lib/utils";
import { client } from "@/server/client";

export default function VotesSectionComment({
  commentId,
}: {
  commentId: number | undefined;
}) {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const queryClient = useQueryClient();

  const { data: comment } = useGetCommentById(commentId);

  const isLoading = isLoadingUser;

  const upvote = async () => {
    if (!comment?.id || !user?.id) return;
    await client.api.v1.comments.upvote.$post({
      json: { commentId: comment.id, userId: user.id },
    });
    queryClient.invalidateQueries({ queryKey: ["get-comment", comment.id] });
  };

  const downvote = async () => {
    if (!comment?.id || !user?.id) return;
    await client.api.v1.comments.downvote.$post({
      json: { commentId: comment.id, userId: user.id },
    });
    queryClient.invalidateQueries({ queryKey: ["get-comment", comment.id] });
  };

  const isUpvoted = comment?.upvotes?.includes(user?.id ?? -1);
  const isDownvoted = comment?.downvotes?.includes(user?.id ?? -1);
  return (
    <div className="flex gap-2 mt-5">
      <div
        className={cn(
          "rounded-full flex gap-1 items-center text-xs",
          isUpvoted ? "bg-orange-400" : isDownvoted ? "bg-blue-400" : "",
        )}
      >
        <button
          disabled={isLoading}
          type="button"
          className="p-1.5 hover:bg-neutral-600 rounded-full group"
          onClick={() => upvote()}
        >
          <Image
            src="/icons/up-icon.svg"
            width={12}
            height={12}
            alt=""
            className="block group-hover:hidden"
          />
          <Image
            src="/icons/up-icon-red.svg"
            width={12}
            height={12}
            alt=""
            className="group-hover:block hidden"
          />
        </button>
        {(comment?.upvotes?.length ?? 0) - (comment?.downvotes?.length ?? 0)}
        <button
          disabled={isLoading}
          type="button"
          className="p-1.5 hover:bg-neutral-600 rounded-full group"
          onClick={() => downvote()}
        >
          <Image
            src="/icons/down-icon.svg"
            width={12}
            height={12}
            alt=""
            className="block group-hover:hidden"
          />
          <Image
            src="/icons/down-icon-blue.svg"
            width={12}
            height={12}
            alt=""
            className="group-hover:block hidden"
          />
        </button>
      </div>
    </div>
  );
}
