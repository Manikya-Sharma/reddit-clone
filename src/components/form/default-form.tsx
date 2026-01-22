import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { ThemedForm } from "./themed-form";

type DefaultFormProps = {
  schema: RJSFSchema;
  uiSchema: UiSchema;
};

export function DefaultForm({ schema, uiSchema }: DefaultFormProps) {
  return (
    <ThemedForm schema={schema} uiSchema={uiSchema} validator={validator} />
  );
}
