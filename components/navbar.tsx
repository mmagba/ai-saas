'use client'

import { UserButton } from "@clerk/nextjs"

import MobileSidebar from "./mobileSidebar"

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex justify-end w-full">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar