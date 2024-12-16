"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ShareButtonProps {
  userId: string;
}

export default function ShareButton({ userId }: ShareButtonProps) {
  const shareUrl = `${window.location.origin}/wishlist/${userId}`; // Updated to use the new route

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Wishlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your wishlist</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input readOnly value={shareUrl} className="flex-1" />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
