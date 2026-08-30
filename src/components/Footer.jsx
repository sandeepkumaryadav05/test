import { Facebook, Instagram, Leaf, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useApp } from '../context/AppContext'

const SHOP_LINKS = [
  { label: 'Fresh Milk', to: '/shop?category=Milk' },
  { label: 'Paneer', to: '/shop?category=Paneer' },
  { label: 'Ghee', to: '/shop?category=Ghee' },
  { label: 'Curd', to: '/shop?category=Curd' },
  { label: 'Butter', to: '/shop?category=Butter' },
]
const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Our Farm', to: '/farm' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/contact#faq' },
]
const SUPPORT_LINKS = [
  { label: 'Shipping', to: '/contact' },
  { label: 'Returns', to: '/contact' },
  { label: 'Privacy', to: '/about' },
  { label: 'Terms', to: '/about' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { subscribeNewsletter, toast } = useApp()

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address', 'error')
      return
    }
    subscribeNewsletter(email.trim())
    setEmail('')
    toast("You're on the list! Freshness incoming.")
  }

  return (
    <footer className="relative mt-auto bg-forest-deeper text-cream-50">
      <svg className="absolute -top-px left-0 w-full text-cream-50" viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40h1440V22C1200 2 960 34 720 20 480 6 240 30 0 14v26z" fill="currentColor" />
      </svg>

      <div className="container-x grid gap-10 pb-10 pt-24 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-50/65">
            “Pure From Our Farm to Your Family.” Farm-fresh dairy delivered every morning across the city.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                onClick={(e) => e.preventDefault()}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-cream-50/80 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-forest-deeper"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Shop" links={SHOP_LINKS} />
        <FooterCol title="Company" links={COMPANY_LINKS} />
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold-light">Support</p>
          <ul className="space-y-2.5 text-sm text-cream-50/70">
            {SUPPORT_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-gold-light">{l.label}</Link>
              </li>
            ))}
            <li className="pt-3 font-sans not-italic">
              <a href="tel:+919559800992" className="flex items-center gap-2 transition-colors hover:text-gold-light">
                <Phone size={14} /> +91 95598 00992
              </a>
            </li>
            <li>
              <a href="mailto:devanshdairy25@gmail.com" className="flex items-center gap-2 transition-colors hover:text-gold-light">
                <Mail size={14} /> devanshdairy25@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" /> Devansh Dairy, Samhai Rajputani, Luxmanpatti Devanathpur, Bhadohi 221304
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-xs text-cream-50/55">© 2026 Devansh Dairy. All rights reserved.</p>
          <form onSubmit={submit} className="flex w-full max-w-sm items-center overflow-hidden rounded-full bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-gold">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="w-full bg-transparent px-4 py-2 text-xs text-cream-50 outline-none placeholder:text-cream-50/45"
            />
            <button type="submit" className="shrink-0 rounded-full bg-gold px-4 py-2 text-xs font-bold text-forest-deeper transition-colors hover:bg-gold-light">
              Subscribe
            </button>
          </form>
          <span className="inline-flex items-center gap-1.5 text-xs text-cream-50/55">
            <Leaf size={13} className="text-leaf-light" /> 100% Natural
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold-light">{title}</p>
      <ul className="space-y-2.5 text-sm text-cream-50/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition-colors hover:text-gold-light">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
