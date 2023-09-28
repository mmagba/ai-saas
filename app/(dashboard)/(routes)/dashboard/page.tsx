'use client'
import Link from "next/link";
import { MessageSquare, ImageIcon, VideoIcon, Music, Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const routes = [
    {
        label: "Conversation",
        icon: MessageSquare,
        href: '/conversation',
        bgColor: 'bg-violet-500/10',
        color: 'text-violet-500'
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: '/image',
        bgColor: 'bg-pink-700/10',
        color: 'text-pink-700'
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: '/video',
        bgColor: 'bg-orange-700/10',
        color: 'text-orange-700'
    },
    {
        label: "Music Generation",
        icon: Music,
        href: '/music',
        bgColor: 'bg-emerald-500/10',
        color: 'text-emerald-500'
    },
    {
        label: "Code Generation",
        icon: Code,
        href: '/code',
        bgColor: 'bg-green-700/10',
        color: 'text-green-700'
    }
];



const DashboardPage = () => {
    return (
        <div>

            <div className="space-y-4 mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-center text-muted-foreground font-light text-sm md:text-lg">Chat with the smartest AI - Experience the power of AI</p>
            </div>

            <div className="px-4 md:px-20 lg:px-32">
                {routes.map((route) => (
                    <Link href={route.href} key={route.href}>
                        <Card className="border-black/10 flex justify-between hover:shadow-md transition p-4 items-center mb-4">

                            <div className="flex items-center gap-x-4">

                                <div className={cn('p-2 w-fit rounded-md ', route.bgColor)}>
                                    <route.icon className={cn('w-8 h-8', route.color)} />
                                </div>

                                <div>
                                    {route.label}
                                </div>

                            </div>

                            <ArrowRight />

                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;