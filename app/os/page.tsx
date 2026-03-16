// Server Component

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import OSHero from "@/components/os/OSHero";
import OSFeaturesGrid from "@/components/os/OSFeaturesGrid";
import OSTargetAudience from "@/components/os/OSTargetAudience";
import OSPricing from "@/components/os/OSPricing";
import OSQuoteSection from "@/components/os/OSQuoteSection";

export default function OSPage() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black">
            <Navbar />
            <div className="pt-20"> {/* Offset for fixed navbar */}
                <OSHero />
                <OSFeaturesGrid />
                <OSTargetAudience />
                <OSPricing />
                <OSQuoteSection />
            </div>
            <TrustFooter />
        </main>
    );
}
