import '@/styles/globals.css'
import { Fredoka } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight
const fredoka = Fredoka({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return <main className={fredoka.className}>
    <Component {...pageProps} />
  </main>
}
