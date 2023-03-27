import '@/styles/globals.css';
import { Fredoka } from '@next/font/google';
import Head from 'next/head'
import { AnimatePresence, LazyMotion, domAnimation, domMax } from 'framer-motion';
import { createContext, useState } from 'react';
// If loading a variable font, you don't need to specify the font weight
const fredoka = Fredoka({ subsets: ['latin'] })

export const GameContext = createContext()
export default function App({ Component, pageProps }) {
  const [Volume, setVolume] = useState(.5)
  const [BGMVolume, setBGMVolume] = useState(.2)
  return <>
    <Head>
      <meta name="description" content="Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta content="/icons/advisor.svg" property='og:image' />
      <meta property="og:description" content="Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow." />
      <link rel="icon" href="/icons/advisor_icon.svg" />
    </Head>
    <style jsx global>{`
        html, button, ::placeholder, input {
          font-family: ${fredoka.style.fontFamily};
        }
      `}</style>

    <GameContext.Provider value={{ Volume, setVolume, BGMVolume, setBGMVolume }}>
      <LazyMotion features={domMax} strict>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} />
        </AnimatePresence>
      </LazyMotion>
    </GameContext.Provider>

  </>
}
