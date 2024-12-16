"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createUser } from './actions'
import { cn } from '@/lib/utils'

const accentColors = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Purple', value: 'purple' },
  { name: 'Pink', value: 'pink' },
  { name: 'Orange', value: 'orange' },
  { name: 'Teal', value: 'teal' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Cyan', value: 'cyan' },
] as const

type AccentColor = typeof accentColors[number]['value']

export default function OnboardingPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [accentColor, setAccentColor] = useState<AccentColor | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username === '' || accentColor === null) {
      alert('Please fill out all fields.')
      return
    }

    try {
      await createUser(username, accentColor)
      router.push('/wishlist')
    } catch (error) {
      console.error('Error during onboarding:', error)
      alert('An error occurred during onboarding. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Gift Guide!</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="username">Choose a username (for your wishlist URL)</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="">
          <Label>Choose an accent color for your wishlist</Label>
          <RadioGroup onValueChange={(color: AccentColor) => setAccentColor(color)} className="grid grid-cols-5 gap-6 max-w-3xl mx-auto p-8">
            {accentColors.map((color) => (
              <div key={color.value} className={cn(`flex items-center space-x-2 p-2 rounded-2xl`, `bg-${color.value}-400`)}>
                <RadioGroupItem value={color.value} id={color.value} />
                <Label htmlFor={color.value}>{color.name}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="hidden bg-red-400 bg-blue-400 bg-green-400 bg-yellow-400 bg-purple-400 bg-pink-400 bg-orange-400 bg-teal-400 bg-indigo-400 bg-cyan-400" />
        </div>
        <Button type="submit">Complete Onboarding</Button>
      </form>
    </div>
  )
}

