'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";


const font = Montserrat({ weight: '600', subsets: ['latin'] });

const LandingNavbar = () => {

    const { isSignedIn } = useAuth();
    return (
        <nav className="flex justify-between items-center p-4 mx-auto">


            <div className="flex items-center gap-2">
                <div className="h-8 w-8 relative">
                    <Image src={'/logo.png'} alt="genius logo" fill />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Genius
                </h1>
            </div>

            <Button variant='outline' className="rounded-full">
                <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                    Get Started
                </Link>
            </Button>
        </nav >
    )
}

export default LandingNavbar;