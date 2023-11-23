import { Zap } from "lucide-react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

interface freeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}


export const FreeCounter = ({ apiLimitCount, isPro = false }: freeCounterProps) => {

    const proModal = useProModal();

    if (isPro) {
        return null;
    }


    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="text-center text-white text-sm mb-4 space-y-2 py-6">
                    <p>
                        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                    </p>
                    <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    <Button className="w-full" variant='premium' onClick={proModal.onOpen}>
                        Upgrade
                        <Zap className="fill-white ml-2 w-4 h-4" />
                    </Button>
                </CardContent>

            </Card>
        </div>
    )
}