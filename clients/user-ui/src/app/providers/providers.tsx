// app/providers.tsx
"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/src/graphql/gql.setup";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={graphqlClient}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
    </ApolloProvider>
  );
}
