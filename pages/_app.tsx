import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { queryClient } from '@/config/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isErrorPage = router.pathname === '/_error';

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Giffygram</title>
      </Head>

      <ThemeProvider>
        {isErrorPage && <Component {...pageProps} />}

        {!isErrorPage && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
