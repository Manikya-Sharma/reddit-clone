import { getSubmitButtonOptions, type SubmitButtonProps } from "@rjsf/utils";
import { DialogClose } from "@/components/ui/dialog";

export default function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { submitText, props: subProps } = getSubmitButtonOptions(uiSchema);
  return subProps?.className?.includes("dialog") ? (
    <DialogClose asChild>
      <button
        className="text-center py-3 w-full rounded-full cursor-pointer disabled:bg-neutral-700 bg-red-600 hover:bg-red-800 transition-colors"
        type="submit"
      >
        {submitText}
      </button>
    </DialogClose>
  ) : (
    <button
      className="text-center py-3 w-full rounded-full cursor-pointer disabled:bg-neutral-700 bg-red-600 hover:bg-red-800 transition-colors"
      type="submit"
    >
      {submitText}
    </button>
  );
}
