import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface SpotLiteBrandProps {
  size?: "sm" | "md";
  className?: string;
  to?: string | null;
}

export function SpotLiteBrand({
  size = "sm",
  className,
  to = "/",
}: SpotLiteBrandProps) {
  const isMd = size === "md";

  const brandMark = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/25 shrink-0",
          isMd ? "h-9 w-9" : "h-8 w-8"
        )}
      >
        <Zap size={isMd ? 20 : 18} className="fill-current text-white" />
      </div>
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-extrabold tracking-tight text-foreground leading-tight",
            isMd ? "text-xl" : "text-lg"
          )}
        >
          Spot<span className="text-primary">Lite</span>
        </span>
        <span
          className={cn(
            "font-semibold uppercase tracking-widest text-muted-foreground -mt-1",
            isMd ? "text-[9px]" : "text-[0.5625rem]"
          )}
        >
          Intelligence
        </span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="w-fit inline-block">
        {brandMark}
      </Link>
    );
  }

  return brandMark;
}
