import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return <div className="min-h-[100svh] min-w-[100svw] flex items-center justify-center">
    <Loader2Icon className="animate-spin" />
  </div>
}