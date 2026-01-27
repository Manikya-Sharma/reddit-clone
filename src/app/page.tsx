"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "./api/v1/[[...route]]/route";
import LoginCard from "./components/login-card";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const data = await client.api.v1.helloRoute.hello.$get();
      return await data.json();
    },
  });
  return <LoginCard />;
}
