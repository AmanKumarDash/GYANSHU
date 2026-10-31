import Hero from '../home/Hero'
import Perspectives from '../home/Perspectives'
import Capabilities from '../home/Capabilities'
import Platforms from '../home/Platforms'
import Industries from '../home/Industries'
import EmergingTech from '../home/EmergingTech'
import Process from '../home/Process'
import WhyGyanshu from '../home/WhyGyanshu'
import Customers from '../home/Customers'
import Testimonials from '../home/Testimonials'

export default function ExperienceHome() {
  return <main className="overflow-x-clip bg-paper text-ink">
    <Hero />
    <Perspectives />
    <div className="bg-[linear-gradient(to_bottom,#f3f2ee_50%,#fff_50%)]"><Platforms /></div>
    <Capabilities />
    <Industries />
    <EmergingTech />
    <Process />
    <WhyGyanshu />
    <Customers />
    <Testimonials />
  </main>
}
