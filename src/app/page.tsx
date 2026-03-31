import Hero from "@/components/Hero";
import Conflict from "@/components/Conflict";
import FeatureCards from "@/components/FeatureCards";
import LogicPreview from "@/components/LogicPreview";
import LiveDemo from "@/components/LiveDemo";
import SocialProof from "@/components/SocialProof";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Conflict />
      <FeatureCards />
      <LogicPreview />
      <LiveDemo />
      <SocialProof />
      <Waitlist />
      <footer className="border-t border-border px-6 py-10 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} Signal &mdash; Universal Contact Strategy
      </footer>
    </main>
  );
}
