import {
  render,
} from '@testing-library/react';
import React, { ReactNode } from 'react';
import { createRouterWrapper } from '@Utils/tests/wrappers';
import { QueryClient, QueryClientProvider } from 'react-query';

export * from '@testing-library/react';

const RouterWrapper = createRouterWrapper('/', '/');

const customRender = (
  children: ReactNode | ReactNode[],
) =>
  render(
    <RouterWrapper>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </RouterWrapper>
  );

export { customRender as render };
