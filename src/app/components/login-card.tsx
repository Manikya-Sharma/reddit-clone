"use client";

import type { RJSFSchema } from "@rjsf/utils";
import { useState } from "react";
import loginSchema from "@/app/schemas/login-schema.json";
import loginUiSchema from "@/app/schemas/login-ui-schema.json";
import { DefaultForm } from "@/components/form/default-form";

export default function LoginCard() {
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
            alert(JSON.stringify(data.formData, null, 2));
          }}
        />
      </div>
    </div>
  );
}
