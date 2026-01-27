import type { RJSFSchema } from "@rjsf/utils";
import loginSchema from "@/app/schemas/login-schema.json";
import loginUiSchema from "@/app/schemas/login-ui-schema.json";
import { DefaultForm } from "@/components/form/default-form";

export default function LoginCard() {
  return (
    <div className="flex flex-col bg-[#181c1f] rounded-lg px-24 pt-24">
      <div className="grow shrink-0">
        <DefaultForm
          schema={loginSchema as RJSFSchema}
          uiSchema={loginUiSchema}
        />
      </div>
    </div>
  );
}
