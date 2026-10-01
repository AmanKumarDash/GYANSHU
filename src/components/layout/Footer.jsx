import { Link } from 'react-router-dom'
import { Briefcase as Linkedin, Camera as Instagram, Users as Facebook, Mail, Phone, MapPin } from 'lucide-react'

const footerGroups = [
  { title: 'Services', links: [['Cybersecurity', '/services/cybersecurity'], ['Network Infrastructure', '/services/network'], ['IoT Solutions', '/services/iot'], ['Application Development', '/services/application'], ['Regulatory Compliance', '/services/regulatory'], ['Training', '/training']] },
  { title: 'Company', links: [['About Gyanshu', '/about'], ['Why Choose Us', '/why-choose-us'], ['Our Mission', '/mission'], ['Core Values', '/core-values'], ['Careers', '/careers'], ['Contact', '/contact']] },
  { title: 'Explore', links: [['Products', '/products'], ['Industries', '/industries'], ['Our Work', '/our-work'], ['Support', '/support'], ['Help & FAQ', '/help']] },
]

export default function Footer() {
  return <footer className="corporate-footer bg-[#36444b] text-white border-t border-white/10 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
        <div className="col-span-2 lg:col-span-2 lg:pr-10"><Link to="/" className="inline-block mb-5"><img src="/gyanshu-logo.svg" alt="Gyanshu Technologies Pvt. Ltd." className="w-[220px] h-auto brightness-0 invert" /></Link><p className="text-mist-900 text-sm mb-7 leading-relaxed max-w-sm">Secure, automate, monitor, and operate critical technology environments with confidence.</p><div className="flex flex-col gap-3 text-sm text-mist-900"><a href="mailto:Support.gyanshu@gmail.com" className="inline-flex items-center gap-3 hover:text-white"><Mail size={16} />Support.gyanshu@gmail.com</a><a href="tel:+919040961361" className="inline-flex items-center gap-3 hover:text-white"><Phone size={16} />+91 90409 61361</a><p className="inline-flex items-center gap-3"><MapPin size={16} />India</p></div><div className="flex gap-3 mt-6 text-mist-900"><a aria-label="LinkedIn" href="https://linkedin.com" className="p-2 rounded-full hover:bg-white/5 hover:text-white"><Linkedin size={18} /></a><a aria-label="Instagram" href="https://instagram.com" className="p-2 rounded-full hover:bg-white/5 hover:text-white"><Instagram size={18} /></a><a aria-label="Facebook" href="https://facebook.com" className="p-2 rounded-full hover:bg-white/5 hover:text-white"><Facebook size={18} /></a></div></div>
        {footerGroups.map((group) => <div key={group.title}><h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-5">{group.title}</h4><ul className="flex flex-col gap-3 text-sm text-mist-500">{group.links.map(([label, to]) => <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>)}</ul></div>)}
      </div>
      <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-mist-900"><p>© 2026 Gyanshu Technology. All rights reserved.</p><div className="flex gap-4"><Link to="/privacy" className="hover:text-white">Privacy</Link><Link to="/terms" className="hover:text-white">Terms</Link><Link to="/compliance" className="hover:text-white">Compliance</Link><Link to="/cookies" className="hover:text-white">Cookies</Link></div></div>
    </div>
  </footer>
}
