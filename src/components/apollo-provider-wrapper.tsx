'use client';
import { ApolloProvider } from '@apollo/client';
import client from '@/services/apollo-client';

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
