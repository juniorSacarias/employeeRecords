"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { useState } from "react";

// For use react-query need wrap the children with the QueryClientProvider, use this Provider utils because in the layout can`t use client

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
