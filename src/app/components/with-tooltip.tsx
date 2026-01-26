export default function WithTooltip({
  children,
  tooltipText,
}: {
  children: React.ReactNode;
  tooltipText: string;
}) {
  return (
    // TODO: Add tooltip functionality
    <div data-tooltip={tooltipText}>{children}</div>
  );
}
