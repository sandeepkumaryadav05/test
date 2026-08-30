import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import SectionHeading from '../components/SectionHeading'
import { useApp } from '../context/AppContext'
import { FAQS } from '../data/site'

export default function Contact() {
  usePageMeta({
    title: 'Contact Us',
    description: 'Questions about delivery, subscriptions or bulk orders? Talk to the Devansh team.',
  })
  const { toast } = useApp()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!form.name.trim()) er.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Enter a valid email.'
    if (form.message.trim().length < 10) er.message = 'Message should be at least 10 characters.'
    setErrors(er)
    if (Object.keys(er).length) return
    setSent(true)
    toast('Message sent! We usually reply within a day.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="animate-page-in pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="We'd Love to Hear From You"
          title="Contact Devansh"
          description="Bulk orders, subscription questions or just want to say hello — reach us any way you like."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* info cards */}
          <div className="space-y-4">
            {[
              { icon: MapPin, title: 'Visit the Farm', lines: ['Devansh Dairy, Samhai Rajputani,' , 'Luxmanpatti Devanathpur, Bhadohi 221304'] },
              { icon: Phone, title: 'Call / WhatsApp', lines: ['+91 95598 00992', '+91 99209 93559'] },
              { icon: Mail, title: 'Email Us', lines: ['devanshdairy25@gmail.com'] },
              { icon: Clock, title: 'Support Hours', lines: ['Mon – Sat · 6 AM – 9 PM', 'Sunday · 6 AM – 1 PM'] },
            ].map((c) => (
              <motion.div 
                key={c.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card flex gap-4 p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-pale text-forest">
                  <c.icon size={19} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-forest">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-xs leading-relaxed text-ink/55">{l}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* form */}
          <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-forest">Send Us a Message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="label">Your Name</span>
                <input className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={set('name')} placeholder="Aarav Mehta" />
                {errors.name && <span className="mt-1 block text-xs font-semibold text-red-500">{errors.name}</span>}
              </label>
              <label className="block"><span className="label">Email</span>
                <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} value={form.email} onChange={set('email')} placeholder="you@example.com" />
                {errors.email && <span className="mt-1 block text-xs font-semibold text-red-500">{errors.email}</span>}
              </label>
              <div className="sm:col-span-2">
                <label className="block"><span className="label">Subject</span>
                  <input className="input" value={form.subject} onChange={set('subject')} placeholder="Bulk order for my cafe" />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="block"><span className="label">Message</span>
                  <textarea rows={5} className={`input resize-none ${errors.message ? 'input-error' : ''}`} value={form.message} onChange={set('message')} placeholder="Tell us how we can help..." />
                  {errors.message && <span className="mt-1 block text-xs font-semibold text-red-500">{errors.message}</span>}
                </label>
              </div>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl bg-leaf-pale px-4 py-3 text-sm font-semibold text-leaf"
                >
                  Message sent! We'll get back to you within 24 hours.
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="btn-primary mt-6 group">
              Send Message <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </div>

        {/* faq */}
        <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-28">
          <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest/8">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-forest"
                >
                  {f.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p className="border-t border-forest/8 px-5 py-4 text-sm leading-relaxed text-ink/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
