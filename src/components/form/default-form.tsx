import type { IChangeEvent } from "@rjsf/core";
import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import type { FormEvent } from "react";
import { ThemedForm } from "./themed-form";

type DefaultFormProps<T> = {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  formData: T;
  onChange: (data: T) => void;
  onSubmit: (data: IChangeEvent, event: FormEvent) => void;
  disabled?: boolean;
};

export function DefaultForm<T>({
  schema,
  uiSchema,
  formData,
  onChange,
  onSubmit,
  disabled,
}: DefaultFormProps<T>) {
  return (
    <ThemedForm
      formData={formData}
      onChange={(data) => {
        onChange(data.formData as T);
      }}
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onSubmit={onSubmit}
      disabled={disabled}
    />
  );
}
