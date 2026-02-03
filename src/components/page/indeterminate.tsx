"use client";
import { LinearProgress } from "@mui/material";

export default function Indeterminate({
  isLoading = true,
}: {
  isLoading?: boolean;
}) {
  return isLoading ? (
    <div className="fixed z-50 top-0 inset-x-0 text-[#fc4c02]">
      <LinearProgress color="inherit"></LinearProgress>
    </div>
  ) : null;
}
