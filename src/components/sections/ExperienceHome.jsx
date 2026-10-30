import Hero from '../home/Hero'
import Perspectives from '../home/Perspectives'
import Capabilities from '../home/Capabilities'
import Platforms from '../home/Platforms'
import Industries from '../home/Industries'
import Process from '../home/Process'
import UseCases from '../home/UseCases'

export default function ExperienceHome() {
  return <main className="overflow-x-clip bg-paper text-ink">
    <Hero />
    <Perspectives />
    <div className="bg-[linear-gradient(to_bottom,#f3f2ee_50%,#fff_50%)]"><Platforms /></div>
    <Capabilities />
    <Industries />
    <Process />
    <UseCases />
  </main>
}
