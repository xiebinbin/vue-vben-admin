import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { createApolloProvider } from '@vue/apollo-option';
import { TOKEN_KEY } from '/@/enums/cacheEnum';
import { getAuthCache } from '/@/utils/auth';
import { App } from 'vue';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
const cache = new InMemoryCache();

const link = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAuthCache(TOKEN_KEY);
    console.log('token:');
    console.log(getAuthCache(TOKEN_KEY));
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return forward(operation);
  }),
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }),
  createHttpLink({
    uri: globSetting.graphqlUrl,
  }),
]);
const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

const apolloProvider = createApolloProvider({
  defaultClient: client,
});

export function setupApollo(app: App<Element>) {
  app.use(apolloProvider);
}

export {};
