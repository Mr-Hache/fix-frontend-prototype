import type { Metadata } from 'next';
import ApolloProviderWrapper from '@/components/apollo-provider-wrapper';
import './globals.css';
import { roboto } from '@/resources/fonts';
import 'material-icons/iconfont/material-icons.css';

export const metadata: Metadata = {
  title: 'Fix',
  description: 'this is a Fix product',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const font = roboto.className;
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${font} flex  text-white-1 text-base sm:text-sm 2xl:text-base w-screen h-dvh overflow-hidden bg-gray-1`}
      >
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </body>
    </html>
  );
}
