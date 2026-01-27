import type { WidgetProps } from "@rjsf/utils";
import TextWidget from "./text-widget";

export default function PasswordWidget(props: WidgetProps) {
  return <TextWidget type="email" {...props} />;
}
