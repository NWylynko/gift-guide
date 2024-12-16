import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { GiftIcon, ListIcon, ShareIcon } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <GiftIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Gift Guide</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/wishlist">
            My Wishlist
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Your Perfect Gift Guide
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Easily create and share your wishlist with friends and family. Never receive an unwanted gift again!
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/wishlist">
                  <Button>Get Started</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ListIcon className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-bold">Create Your Wishlist</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add items from any online store to your personal wishlist.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShareIcon className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-bold">Share with Loved Ones</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Easily share your wishlist with friends and family.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <GiftIcon className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-bold">Receive Perfect Gifts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ensure you always receive gifts you truly want and need.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How It Works</h2>
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="mt-4 text-lg font-bold">Create an Account</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sign up for a free Gift Guide account.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="mt-4 text-lg font-bold">Add Items to Your Wishlist</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Browse online stores and add items to your wishlist.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="mt-4 text-lg font-bold">Share Your Wishlist</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Share your wishlist link with friends and family.</p>
              </li>
            </ol>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Gift Guide. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

