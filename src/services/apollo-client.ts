import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 1. Define el enlace HTTP
const httpLink = createHttpLink({
  uri: 'https://fix-r4md.onrender.com/api/v1/graphql', // URL de tu servidor GraphQL
});

// 2. Define un enlace de contexto para agregar encabezados
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers, // Mantén los encabezados existentes
      'Content-Type': 'application/json', // Agrega el encabezado Content-Type
      // Si necesitas agregar otros encabezados, como un token de autenticación:
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  };
});

// 3. Combina los enlaces
const link = authLink.concat(httpLink);

// 4. Crea el cliente Apollo
const client = new ApolloClient({
  link: link, // Usa el enlace combinado
  cache: new InMemoryCache(), // Usa una caché en memoria
});

export default client;
