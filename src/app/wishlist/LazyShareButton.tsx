"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const ShareButton = dynamic(() => import("./ShareButton"), { ssr: false });

export const LazyShareButton = (props: ComponentProps<typeof ShareButton>) => {
  return <ShareButton {...props} />;
};
