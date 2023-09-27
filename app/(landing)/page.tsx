import { Button } from "@/components/ui/button"
import Link from "next/link";


export default function Home() {
    return (
        <>
            <p className='text-6xl'>Hello AI SaaS</p>
            <div>
                <Link href={'/sign-up'}>
                    <Button>Register</Button>
                </Link>
                <Link href={'/sign-in'}>
                    <Button>Login</Button>
                </Link>
            </div>
        </>

    )
}
