import type { WidgetProps } from "@rjsf/utils";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TextWidget({
  className,
  value,
  onChange,
  placeholder,
  rawErrors,
  type,
}: WidgetProps & { type?: "password" | "text" | "email" }) {
  return (
    <Input
      value={value}
      className={cn(
        "inline-block rounded-full p-4 my-4 h-auto placeholder:text-lg",
        className,
      )}
      type={type}
      aria-invalid={(rawErrors?.length ?? 0) > 0}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
