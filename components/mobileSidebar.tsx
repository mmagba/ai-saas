
import { Menu } from "lucide-react"

import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet"
import Sidebar from "./sidebar"


interface mobileSidebarProps {
    apiLimitCount: number;
}

const MobileSidebar = ({ apiLimitCount }: mobileSidebarProps) => {


    return (

        <Sheet>

            <SheetTrigger className="md:hidden">

                <Menu />

            </SheetTrigger>
            <SheetContent side={'left'} className="p-0">
                <Sidebar apiLimitCount={apiLimitCount} />
            </SheetContent>

        </Sheet>
    )
}

export default MobileSidebar