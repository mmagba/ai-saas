import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return (
        <>
            <p className='text-6xl'>dashboard</p>
            <UserButton afterSignOutUrl="/" />
        </>
    )
}

export default DashboardPage;