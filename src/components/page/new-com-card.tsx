"use client";

import type { RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import schema from "@/app/schemas/new-com-schema.json";
import uiSchema from "@/app/schemas/new-com-ui-schema.json";
import { DefaultForm } from "@/components/form/default-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/server/client";
import { useGetUser } from "@/app/hooks/useGetUser";

type FormData = {
  title: string;
  description: string;
  status: "public" | "private";
};

export default function NewComCard() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: "public",
  });

  const { data: user, isLoading } = useGetUser();

  const {
    mutate: createSub,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user || !user.id) {
        throw new Error("You need to login to create a sub");
      }
      await client.api.v1.subs.create.$post({
        json: {
          ...data,
          rules: [],
          userId: user.id,
        },
      });
    },
  });

  return (
    <div className="flex flex-col rounded-2xl px-18 py-20 max-w-prose">
      <div className="grow shrink-0">
        <DefaultForm
          schema={schema as RJSFSchema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={(data) => {
            setFormData(data);
          }}
          onSubmit={(data) => {
            createSub(data.formData);
          }}
          disabled={isPending || isLoading}
        />
        <div className="text-rose-500 text-center mt-2">
          {error ? error.message : ""}
        </div>
      </div>
    </div>
  );
}
