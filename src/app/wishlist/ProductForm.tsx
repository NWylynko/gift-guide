"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addNewGift } from "./actions";
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const schema = z.object({
  url: z.string().url(),
})

export function ProductForm() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
    },
  })

  const handleSubmit = form.handleSubmit(async ({ url }) => {
    await addNewGift(url)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3500)
  })

  return (
    <>
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <Input
        type="url"
        placeholder="Paste product URL here"
        {...form.register("url")}
        required
        className="flex-grow"
      />
      <Button type="submit">
        Add Product
      </Button>
    </form>
    {showConfetti && <Confetti />}
    </>
  );
}

