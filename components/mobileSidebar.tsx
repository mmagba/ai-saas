
import { Menu } from "lucide-react"

import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet"
import Sidebar from "./sidebar"


interface mobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobileSidebar = ({ apiLimitCount, isPro }: mobileSidebarProps) => {


    return (

        <Sheet>

            <SheetTrigger className="md:hidden">

                <Menu />

            </SheetTrigger>
            <SheetContent side={'left'} className="p-0">
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </SheetContent>

        </Sheet>
    )
}

export default MobileSidebar