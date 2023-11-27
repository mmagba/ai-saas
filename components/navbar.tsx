import { UserButton } from "@clerk/nextjs"

import MobileSidebar from "./mobileSidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();


    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount || 0} isPro={isPro} />
            <div className="flex justify-end w-full">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar