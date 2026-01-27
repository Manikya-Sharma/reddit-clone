import type { TitleFieldProps } from "@rjsf/utils";

export default function TitleFieldTemplate({ title }: TitleFieldProps) {
  return <div className="text-center font-bold text-2xl">{title}</div>;
}
