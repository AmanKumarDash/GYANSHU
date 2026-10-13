import Hero from '../home/Hero'
import Perspectives from '../home/Perspectives'
import Capabilities from '../home/Capabilities'
import Platforms from '../home/Platforms'
import Industries from '../home/Industries'
import Process from '../home/Process'
import UseCases from '../home/UseCases'
import ClosingCTA from '../home/ClosingCTA'

export default function ExperienceHome() {
  return <main className="overflow-x-clip bg-paper text-ink">
    <Hero />
    <Perspectives />
    <Capabilities />
    <div className="bg-[linear-gradient(to_bottom,#fff_50%,#f3f2ee_50%)]"><Platforms /></div>
    <Industries />
    <Process />
    <UseCases />
    <ClosingCTA />
  </main>
}
