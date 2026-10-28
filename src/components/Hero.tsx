import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const TYPEWRITER_TEXT = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?'
const EMAIL = 'hello@mainframe.co'
const ACTIONS = ['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate']

const pillBase =
  'inline-flex items-center justify-center rounded-full border text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200'

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="8" height="8" rx="1" stroke="currentColor" />
      <path d="M8.5 1.5V1a.5.5 0 0 0-.5-.5H1A.5.5 0 0 0 .5 1v7a.5.5 0 0 0 .5.5h.5" stroke="currentColor" />
    </svg>
  )
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowActions(true), 400)
    return () => clearTimeout(t)
  }, [])

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {})
  }

  return (
    <section
      className="relative h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-xl relative z-10">
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        <p
          className="text-black mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
          )}
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${pillBase} bg-white text-black border-black/10 hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={copyEmail}
            className={`${pillBase} gap-2 sm:gap-3 text-white bg-transparent border-white hover:bg-white hover:text-black`}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
