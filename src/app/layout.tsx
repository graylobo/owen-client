"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function StoreInitializer() {
  const setHydrated = useUserStore((state) => state.setHydrated);

  useEffect(() => {
    // Initialize zustand store
    useUserStore.persist.rehydrate();
    setHydrated(true);
  }, [setHydrated]);

  return null;
}

function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <Toaster position="top-center" richColors />
          <StoreInitializer />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutContent>{children}</RootLayoutContent>
    </QueryClientProvider>
  );
}
