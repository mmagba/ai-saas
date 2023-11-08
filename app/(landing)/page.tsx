import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import LandingNavbar from "@/components/landing-navbar";


export default function Home() {

    return (
        <main className="bg-[#111827]">
            <div className="max-w-screen-xl mx-auto">
                <LandingNavbar />
                <LandingHero />
                <LandingContent />
            </div>
        </main>

    )
}
