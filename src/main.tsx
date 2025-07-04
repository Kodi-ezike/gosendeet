import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/query.ts";
import { Toaster } from "@/components/ui/sonner"
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
      <App />
      <Toaster position="top-right" richColors />
      </NextUIProvider>
    </QueryClientProvider>
  </StrictMode>
);
