import type { DescriptionFieldProps } from "@rjsf/utils";

export default function DescriptionFieldTemplate({
  description,
}: DescriptionFieldProps) {
  return <div className="text-neutral-400 text-center">{description}</div>;
}
