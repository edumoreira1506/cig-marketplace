import { ReactNode } from 'react';
import { createRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

export const createRouterWrapper = (as: string, pathname: string, query: Record<string, string> = {})  => {
  const router = createRouter(pathname, query, as, {
    subscription: jest.fn().mockImplementation(Promise.resolve),
    initialProps: {},
    pageLoader: jest.fn(),
    Component: jest.fn(),
    App: jest.fn(),
    wrapApp: jest.fn(),
    isFallback: false,
  });

  const RouterWrapper = ({ children }: { children: ReactNode }) => <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;

  return RouterWrapper;
};
