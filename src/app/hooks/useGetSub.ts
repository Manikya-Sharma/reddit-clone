import { useQuery } from "@tanstack/react-query";
import { client } from "@/server/client";

export const useGetSub = ({ title }: { title: string | null }) => {
  return useQuery({
    queryFn: async () => {
      if (!title) {
        throw new Error("Title needed");
      }
      const subResult = await client.api.v1.subs["get-sub-title"].$post({
        json: { title },
      });
      if (subResult.status !== 200) {
        throw new Error("Could not get sub");
      }
      return await subResult.json();
    },
    queryKey: ["get-sub-title", title],
  });
};

export const useGetSubById = ({ id }: { id: number | null | undefined }) => {
  return useQuery({
    queryFn: async () => {
      if (!id) {
        throw new Error("Id needed");
      }
      const subResult = await client.api.v1.subs["get-sub"].$post({
        json: {
          id,
        },
      });
      if (subResult.status !== 200) {
        throw new Error("Could not get sub");
      }
      return await subResult.json();
    },
    queryKey: ["get-sub", id],
  });
};
