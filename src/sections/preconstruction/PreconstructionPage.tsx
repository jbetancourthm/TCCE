import { useState } from 'react'
import PreconstructionTitleBlock from './components/PreconstructionTitleBlock'
import ProjectsCostEstimating from './components/ProjectsCostEstimating'
import PreliminaryConstructionPlan from './components/PreliminaryConstructionPlan'

export default function PreconstructionPage() {
  const [activePreTab, setActivePreTab] = useState<0 | 1>(0)

  return (
    <section className="mt-12 flex w-full flex-col items-center text-center">
      <PreconstructionTitleBlock activePreTab={activePreTab} onTabChange={setActivePreTab} />
      {activePreTab === 1 ? <PreliminaryConstructionPlan /> : <ProjectsCostEstimating />}
    </section>
  )
}
