import { Navigate } from 'react-router-dom'
import { getPage } from '../../data/sitePages'
import { ProductCatalog, ProductDetail } from './ProductExperience'
import { CompanyPage, ContactPage, HelpPage, IndustriesListing, IndustryDetail, LegalPage, NotFound, ServiceDetail, ServicesListing } from '../interior/Pages'

const legal = ['/privacy', '/terms', '/compliance', '/cookies']

export default function InteriorPage() {
  const page = getPage(window.location.pathname)
  if (page.type === 'redirect') return <Navigate to={page.to + window.location.hash} replace />
  if (page.path === '/products') return <ProductCatalog page={page} />
  if (page.type === 'product') return <ProductDetail page={page} />
  if (page.path === '/solutions') return <ServicesListing page={page} />
  if (page.path === '/industries') return <IndustriesListing page={page} />
  if (page.type === 'service') return <ServiceDetail page={page} />
  if (page.type === 'industry') return <IndustryDetail page={page} />
  if (page.type === 'missing') return <NotFound page={page} />
  if (page.path === '/contact' || page.path === '/support') return <ContactPage page={page} />
  if (page.path === '/help') return <HelpPage page={page} />
  if (legal.includes(page.path)) return <LegalPage page={page} />
  return <CompanyPage page={page} />
}
