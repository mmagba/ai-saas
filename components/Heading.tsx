import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string;
    desc: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}
 

export const Heading = (props: HeadingProps) => {
    return (
        <div className="flex gap-x-3 items-center px-4 lg:px-8 mb-8">
            <div className={cn('p-2 w-fit rounded-md', props.bgColor)}>
                <props.icon className={cn('w-10 h-10', props.iconColor)} />
            </div>
            <div>
                <h2 className="font-bold text-3xl">{props.title}</h2>
                <p className="text-muted-foreground text-sm">{props.desc}</p>
            </div>

        </div>
    )
}