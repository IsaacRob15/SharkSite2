import { Fragment, useState } from 'react'

const LINKS = ['Laboratório', 'Estúdio', 'Vagas', 'Loja']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
        style={{ zIndex: 10 }}
      >
        <a href="#" className="flex items-center gap-3 text-black">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] select-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        <div className="hidden md:flex text-[23px] text-black">
          {LINKS.map((link, i) => (
            <Fragment key={link}>
              <a href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {i < LINKS.length - 1 && <span className="whitespace-pre">, </span>}
            </Fragment>
          ))}
        </div>

        <a
          href="#"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Fale conosco
        </a>

        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300"
        style={{ zIndex: 9, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      >
        {LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
            onClick={() => setOpen(false)}
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          className="text-[32px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          onClick={() => setOpen(false)}
        >
          Fale conosco
        </a>
      </div>
    </>
  )
}
