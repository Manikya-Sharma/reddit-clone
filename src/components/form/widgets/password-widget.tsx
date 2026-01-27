import type { WidgetProps } from "@rjsf/utils";
import { Input } from "@/components/ui/input";

export default function PasswordWidget({
  className,
  value,
  onChange,
  placeholder,
}: WidgetProps) {
  return (
    <Input
      value={value}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      type="password"
    />
  );
}
