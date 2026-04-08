// Server Component

import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import OSHero from "@/components/contactia/OSHero";
import OSFeaturesGrid from "@/components/contactia/OSFeaturesGrid";
import OSTargetAudience from "@/components/contactia/OSTargetAudience";
import OSPricing from "@/components/contactia/OSPricing";
import OSQuoteSection from "@/components/contactia/OSQuoteSection";

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
