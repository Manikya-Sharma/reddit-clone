"use client";

import type { RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import loginSchema from "@/app/schemas/login-schema.json";
import loginUiSchema from "@/app/schemas/login-ui-schema.json";
import { DefaultForm } from "@/components/form/default-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/server/client";

export default function LoginCard() {
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const result = await client.api.v1.user.$get({ query: data });
	  if (result.status !== 200) {
		  throw new Error("Could not find the user")
	  }	
	  const user = await result.json()
      alert(JSON.stringify(user, null, 2));
    },
  });

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );
  return (
    <div className="flex flex-col bg-[#181c1f] rounded-2xl px-18 py-20">
      <div className="grow shrink-0">
        <DefaultForm
          schema={loginSchema as RJSFSchema}
          uiSchema={loginUiSchema}
          formData={formData}
          onChange={(data) => {
            setFormData(data);
          }}
          onSubmit={(data) => {
            login(data.formData);
          }}
          disabled={isPending}
        />
        <div className="text-rose-500 text-center mt-2">
          {error ? error.message : ""}
        </div>
      </div>
    </div>
  );
}
