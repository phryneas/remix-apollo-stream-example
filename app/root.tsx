import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { WrappedApolloProvider } from "./Transport";
import { makeClient } from "./makeClient";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WrappedApolloProvider makeClient={makeClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </WrappedApolloProvider>
  );
}

export default function App() {
  return <Outlet />;
}
