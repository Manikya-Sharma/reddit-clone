"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Aside from "./aside";

const MainWithAside = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [expanded, setExpanded] = useState(true);
    return (
      <div className="flex flex-col flex-1">
        <Aside expanded={expanded} setExpanded={setExpanded} />
        <div
          className={cn(
            "pt-14 flex-1 flex flex-col",
            expanded ? "ml-77" : "ml-15",
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

export default MainWithAside;
