import React, { useState } from 'react';
import SEOHighlights from './components/SEOHighlights';

// ...existing imports remain here...

export default function App() {
  const [activeTab, setActiveTab] = useState('outline');

  // ...existing state and logic remain here...

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">Interactive Trigonometry Solver</h1>
          <p className="text-white/80 text-lg">Step-by-Step Triangle Calculator, Lessons and Practice</p>
          <p className="max-w-3xl mx-auto mt-3 text-white">
            Solve triangles online with an interactive trigonometry solver for students and teachers.
            Use the sine rule calculator and cosine rule calculator to find missing sides, then
            explore sine, cosine and tangent through lessons, practice questions and worked solutions.
          </p>
        </header>

        <SEOHighlights />

        <nav className="flex justify-center mb-8 mt-8">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-black/10 rounded-full">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  activeTab === tab.key
                    ? `bg-white/90 text-purple-700 shadow-md`
                    : `text-white/80 hover:bg-white/20 active:bg-white/30`
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </nav>

        <main>
          <div key={activeTab} className="fade-in-content">
            {activeTab === 'outline' && (
              <>
                <CurriculumOutline />
                <section aria-labelledby="faq-heading" className="mt-8 rounded-2xl bg-white/90 p-6 sm:p-8 shadow-lg">
                  <h2 id="faq-heading" className="text-2xl font-bold mb-4">Common Trigonometry Questions</h2>
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-semibold">What is a trigonometry solver?</dt>
                      <dd className="mt-1">A trigonometry solver uses relationships between triangle sides and angles to find missing values. This triangle calculator combines guided calculations with lessons and practice.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">When should I use the sine rule or cosine rule calculator?</dt>
                      <dd className="mt-1">In the Oblique Triangle tab, use the sine rule calculator when two angles and one opposite side are known. Use the cosine rule calculator when two sides and their included angle are known.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Which formulas does a right triangle solver use?</dt>
                      <dd className="mt-1">A right triangle solver uses sine, cosine and tangent to relate sides and angles. Explore these ratios in the Trigonometric Ratios lessons before applying them to right triangle problems.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Does this app show step-by-step solutions?</dt>
                      <dd className="mt-1">Yes. The Oblique Triangle tab provides guided steps for sine rule, cosine rule and triangle area calculations, alongside practice questions and worked solutions.</dd>
                    </div>
                  </dl>
                </section>
              </>
            )}
            {activeTab === 'ratios' && <SignsOfTrigRatios />}
            {activeTab === 'graphLessons' && <GraphLessonsHub />}
          </div>
        </main>
      </div>
    </div>
  );
}
