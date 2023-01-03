import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'

export default function App({ Component, pageProps }: AppProps) {
  // Next 에서는 NEXT_PUBLIC 로 시작해야 환경변수 이용가능
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  
  return <Component {...pageProps} />
}
