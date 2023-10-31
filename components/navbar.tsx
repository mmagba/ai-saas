import { UserButton } from "@clerk/nextjs"

import MobileSidebar from "./mobileSidebar"
import { getApiLimitCount } from "@/lib/api-limit"

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();


    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount || 0} />
            <div className="flex justify-end w-full">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar