"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import LoginButton from "./LoginButton"
import { useOCAuth } from "@opencampus/ocid-connect-js"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { authState, ocAuth } = useOCAuth() as {
    authState: { isLoading: boolean; isAuthenticated: boolean; error?: { message: string } };
    ocAuth: { getAuthState: () => { OCId: string } };
  };

 

  if (!authState) {
    return <div>Loading authentication...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        className="w-auto max-w-3xl px-1 py-1 rounded-full backdrop-blur-md bg-black/70 border border-violet-900/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center pl-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-800"
                  animate={{
                    background: [
                      "linear-gradient(to bottom right, #8b5cf6, #6d28d9)",
                      "linear-gradient(to bottom right, #7c3aed, #5b21b6)",
                      "linear-gradient(to bottom right, #8b5cf6, #6d28d9)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(139, 92, 246, 0.7) 0%, rgba(109, 40, 217, 0) 70%)",
                  }}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-white font-bold text-xl relative z-10">V</span>
              </div>
              <span className="ml-2 text-white font-bold text-xl">VeriBee</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 px-6">
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#docs">Docs</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-3 pr-3">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-violet-600 text-violet-400 hover:bg-violet-900/20 rounded-full px-5"
              >
                Faucet
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              {/* <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full px-5"> */}
              {authState.isAuthenticated ? (
                  <p>You are logged in! {JSON.stringify(ocAuth.getAuthState().OCId)}</p>
                ) : (
                  <LoginButton />
                )}
              {/* </Button> */}
            </motion.div>
          </div>

          <div className="md:hidden pr-3">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 py-4 px-4 space-y-2 bg-black/90 backdrop-blur-md rounded-xl border border-violet-900/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="#how-it-works" className="block text-white/80 hover:text-white transition-colors py-2">
              How It Works
            </Link>
            <Link href="#features" className="block text-white/80 hover:text-white transition-colors py-2">
              Features
            </Link>
            <Link href="#pricing" className="block text-white/80 hover:text-white transition-colors py-2">
              Pricing
            </Link>
            <Link href="#docs" className="block text-white/80 hover:text-white transition-colors py-2">
              Docs
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button
                variant="outline"
                className="border-violet-600 text-violet-400 hover:bg-violet-900/20 rounded-full"
              >
                Faucet
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full">OCID Login</Button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link href={href} className="text-white/80 hover:text-white transition-colors text-sm">
        {children}
      </Link>
    </motion.div>
  )
}
