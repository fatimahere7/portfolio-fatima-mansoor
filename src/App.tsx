import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScrollProvider } from './context/ScrollContext';
import { CursorProvider } from './components/cursor/CursorContext';
import { CustomCursor } from './components/cursor/CustomCursor';
import { LoadingScreen } from './components/loader/LoadingScreen';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { WorkSection } from './components/work/WorkSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { CaseStudyView } from './components/case-study/CaseStudyView';
import { PROJECTS } from './data/projects';

function PortfolioCanvas({
  activeProjectId,
  onOpenCaseStudy,
  onCloseCaseStudy,
}: {
  onReplayLoader: () => void;
  activeProjectId: string | null;
  onOpenCaseStudy: (projectId: string) => void;
  onCloseCaseStudy: () => void;
}) {

  const activeProject = activeProjectId
    ? PROJECTS.find((p) => p.id === activeProjectId) || null
    : null;

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#FFFFFF] font-sans selection:bg-[#D94B4B]/30 selection:text-[#FFFFFF] overflow-x-hidden">
      {/* Case Study Full-Page View Overlay vs Main Portfolio */}
      <AnimatePresence mode="wait">
        {activeProject ? (
          <CaseStudyView
            key={`case-study-${activeProject.id}`}
            project={activeProject}
            onClose={onCloseCaseStudy}
            onSelectProject={onOpenCaseStudy}
          />
        ) : (
          <div key="main-portfolio-content">
            {/* Phase 2: Editorial Top Navbar */}
            <Navbar />

            {/* Main Content Phases */}
            <main className="relative z-10 w-full">
              {/* Phase 3: Hero Section */}
              <HeroSection />

              {/* Phase 4: About / Introduction Section */}
              <AboutSection />

              {/* Phase 5: Selected Work / Project Gallery with Case Study Triggers */}
              <WorkSection onOpenCaseStudy={onOpenCaseStudy} />

              {/* Phase 6: What I've Built / Technical Expertise (Soft off-white #F5F5F5) */}
              <SkillsSection />

              {/* Phase 7: Experience / Career Timeline (Dark charcoal #222222) */}
              <ExperienceSection />

              {/* Phase 8: Contact / Final CTA Section (Soft off-white #F5F5F5) */}
              <ContactSection />

              {/* Phase 10: Editorial Technical Footer */}
              <Footer />
            </main>
          </div>
        )}
      </AnimatePresence>

      {/* Global Spring Cursor */}
      <CustomCursor />
    </div>
  );
}

export default function App() {
  const [loaderKey, setLoaderKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Sync hash routing with Case Study state
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const targetId = hash.replace('#project-', '');
        const matched = PROJECTS.find((p) => p.id === targetId);
        if (matched) {
          setActiveProjectId(matched.id);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenCaseStudy = (projectId: string) => {
    setActiveProjectId(projectId);
    window.location.hash = `project-${projectId}`;
  };

  const handleCloseCaseStudy = () => {
    setActiveProjectId(null);
    window.location.hash = 'work';
    // Smoothly scroll back to the work section after exiting
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReplayLoader = () => {
    setIsLoading(true);
    setLoaderKey((prev) => prev + 1);
  };

  return (
    <ScrollProvider>
      <CursorProvider>
        {/* Loading Screen Overlay with Smooth Exit Transition */}
        {isLoading && (
          <LoadingScreen
            key={loaderKey}
            minDuration={2100}
            onComplete={() => setIsLoading(false)}
          />
        )}

        {/* Underlying Main Canvas revealed upon completion */}
        <PortfolioCanvas
          onReplayLoader={handleReplayLoader}
          activeProjectId={activeProjectId}
          onOpenCaseStudy={handleOpenCaseStudy}
          onCloseCaseStudy={handleCloseCaseStudy}
        />
      </CursorProvider>
    </ScrollProvider>
  );
}
