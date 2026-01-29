import { useQuery } from "@tanstack/react-query";
import { client } from "@/server/client";

export function useGetCommentById(commentId: number | undefined) {
  return useQuery({
    queryKey: ["get-comment", commentId],
    queryFn: async () => {
      if (commentId === undefined) return;
      const postsResults = await client.api.v1.comments["get-comment"].$post({
        json: { id: commentId },
      });
      if (postsResults.status !== 200) {
        throw new Error("Could not find the comment");
      }
      return (await postsResults.json()).comment;
    },
  });
}
