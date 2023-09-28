'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: "Music Generation",
        icon: Music,
        href: '/music',
        color: 'text-emerald-500'
    },
    {
        label: "Code Generation",
        icon: Code,
        href: '/code',
        color: 'text-green-700'
    },
    {
        label: "Settings",
        icon: Settings,
        href: '/settings',
        color: 'text-gray-500'
    },
];


const Sidebar = () => {



    const pathname = usePathname();
    return (
        <div className="flex flex-col h-full py-4 space-y-4 text-white bg-gray-900">

            <div className="px-3 py-2 flex-1">

                <Link href={'/dashboard'} className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill src='/logo.png' alt='logo image' />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Genius</h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <Link key={index} href={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium  hover:bg-white/10 rounded-lg transition", pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400')}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Sidebar