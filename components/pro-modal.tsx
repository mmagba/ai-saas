'use client'
import { useEffect, useState } from "react";
import { MessageSquare, ImageIcon, VideoIcon, Music, Code, Check, Zap } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const ProModal = () => {
    const proModal = useProModal();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    const features = [
        {
            label: "Conversation",
            icon: MessageSquare,
            bgColor: 'bg-violet-500/10',
            color: 'text-violet-500'
        },
        {
            label: "Image Generation",
            icon: ImageIcon,
            bgColor: 'bg-pink-700/10',
            color: 'text-pink-700'
        },
        {
            label: "Video Generation",
            icon: VideoIcon,
            bgColor: 'bg-orange-700/10',
            color: 'text-orange-700'
        },
        {
            label: "Music Generation",
            icon: Music,
            bgColor: 'bg-emerald-500/10',
            color: 'text-emerald-500'
        },
        {
            label: "Code Generation",
            icon: Code,
            bgColor: 'bg-green-700/10',
            color: 'text-green-700'
        }
    ];

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center mb-6 mt-4">
                        Upgrade to Genius <Badge variant='premium' className="py-1">PRO</Badge>
                    </DialogTitle>
                    {features.map((feature) => (
                        <Card key={feature.label} className="p-2 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={cn('p-2 w-fit rounded-md ', feature.bgColor)}>
                                    <feature.icon className={cn('w-8 h-8', feature.color)} />
                                </div>
                                <div className="font-semibold text-sm">
                                    {feature.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5" />


                        </Card>
                    ))}
                </DialogHeader>
                <DialogFooter>
                    <Button size='lg' className="w-full" variant='premium' onClick={proModal.onOpen}>
                        Upgrade
                        <Zap className="fill-white ml-2 w-4 h-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};