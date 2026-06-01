'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Clock, Phone, ArrowRight, Shield } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'

export function QuickBookingSection() {
  const router = useRouter()
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (form.pickup) params.set('pickup', form.pickup)
    if (form.dropoff) params.set('dropoff', form.dropoff)
    if (form.date) params.set('date', form.date)
    if (form.time) params.set('time', form.time)
    if (form.phone) params.set('phone', form.phone)
    router.push(`/book${params.toString() ? `?${params.toString()}` : ''}`)
  }

  // Get tomorrow's date as min for date input
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-muted">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0A4D8C 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — intro text */}
          <MotionWrapper variant="fadeUp">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
                <Calendar className="h-4 w-4" />
                Quick Booking
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4 leading-tight">
                Book Your Ride in{' '}
                <span className="text-primary">Minutes</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Fill in your basic ride details below and we will get you started. Our
                full booking form will let you add insurance details, special requirements,
                and more.
              </p>
              <div className="space-y-3">
                {[
                  'No account required — book as a guest',
                  'Get an instant price estimate',
                  'Medicaid, insurance, and private pay accepted',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Right — booking form */}
          <MotionWrapper variant="fadeUp" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-border shadow-xl p-6 sm:p-8 space-y-5"
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-1">
                Start Your Ride Request
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your details and continue to the full booking form.
              </p>

              {/* Pickup Address */}
              <div>
                <label htmlFor="qb-pickup" className="block text-sm font-semibold text-primary mb-1.5">
                  Pickup Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="qb-pickup"
                    name="pickup"
                    type="text"
                    value={form.pickup}
                    onChange={handleChange}
                    placeholder="Enter pickup address"
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Drop-off Address */}
              <div>
                <label htmlFor="qb-dropoff" className="block text-sm font-semibold text-primary mb-1.5">
                  Drop-off Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                  <input
                    id="qb-dropoff"
                    name="dropoff"
                    type="text"
                    value={form.dropoff}
                    onChange={handleChange}
                    placeholder="Enter drop-off address"
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Date & Time — side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qb-date" className="block text-sm font-semibold text-primary mb-1.5">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <input
                      id="qb-date"
                      name="date"
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="qb-time" className="block text-sm font-semibold text-primary mb-1.5">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <input
                      id="qb-time"
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="qb-phone" className="block text-sm font-semibold text-primary mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="qb-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Book Now
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-xs text-center text-muted-foreground">
                You will be taken to the full booking form to complete your request.
              </p>
            </form>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
