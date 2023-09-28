
import { Menu } from "lucide-react"

import { Button } from './ui/button'
import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet"
import Sidebar from "./sidebar"

const MobileSidebar = () => {
    return (

        <Sheet>

            <SheetTrigger className="md:hidden">

                <Menu />

            </SheetTrigger>
            <SheetContent side={'left'} className="p-0">
                <Sidebar />
            </SheetContent>

        </Sheet>
    )
}

export default MobileSidebar