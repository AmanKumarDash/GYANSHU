import { Briefcase as Linkedin, MessageCircle as Twitter, Camera as Instagram, Palette as Dribbble } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/5 pt-24 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Col 1 */}
          <div className="col-span-1 border-r-0 md:border-r md:border-white/5 pr-8">
            <div className="group inline-block mb-6 relative" data-cursor="hover">
              <span className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-signal transition-colors duration-500">GYANSHU TECHNOLOGY</span>
              <div className="absolute top-1/2 left-full ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-mist-900 text-xs text-nowrap">
                Technology & Operations
              </div>
            </div>
            <p className="text-mist-900 text-sm mb-8 leading-relaxed max-w-xs">
              Secure, automate, monitor, and operate critical technology environments.
            </p>
            <div className="flex gap-4 text-mist-900">
              <a href="#" className="hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"><Dribbble size={20} /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-mist-500">
              <li><a href="#services" className="hover:text-white transition-colors" data-cursor="text">Cybersecurity</a></li>
              <li><a href="#services" className="hover:text-white transition-colors" data-cursor="text">IT Infrastructure</a></li>
              <li><a href="#services" className="hover:text-white transition-colors" data-cursor="text">Software & AI</a></li>
              <li><a href="#services" className="hover:text-white transition-colors" data-cursor="text">IoT Monitoring</a></li>
              <li><a href="#services" className="hover:text-white transition-colors" data-cursor="text">Managed IT Services</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-mist-500">
              <li><a href="#about" className="hover:text-white transition-colors" data-cursor="text">About Gyanshu</a></li>
              <li><a href="#process" className="hover:text-white transition-colors" data-cursor="text">Delivery Model</a></li>
              <li><a href="#team" className="hover:text-white transition-colors" data-cursor="text">Capability Areas</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors" data-cursor="text">Insights</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors" data-cursor="text">Contact</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-mist-500">
              <a href="mailto:Support.gyanshu@gmail.com" className="hover:text-white transition-colors" data-cursor="hover">Support.gyanshu@gmail.com</a>
              <p className="mt-4 text-mist-700 leading-relaxed">
                Enterprise technology, cybersecurity,<br/>
                infrastructure and managed operations
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-mist-900">
          <p>© <span title="Gyanshu Technology" className="cursor-help hover:text-signal transition-colors">2026</span> Gyanshu Technology. All rights reserved.</p>
          <p>Technology that keeps business moving.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
