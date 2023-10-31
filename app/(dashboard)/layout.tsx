
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {


    const apiLimitCount = await getApiLimitCount();



    return (
        <div className='h-full relative'>

            <div className='hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900 md:w-72'>
                <Sidebar apiLimitCount={apiLimitCount || 0} />
            </div>


            <main className='md:ml-72'>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout