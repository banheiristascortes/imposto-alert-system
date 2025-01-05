import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { NotificationsPage } from "./components/NotificationsPage";
import { UserProfile } from "./components/profile/UserProfile";
import { FAQ } from "./components/pages/FAQ";
import { Documentation } from "./components/pages/Documentation";
import { Settings } from "./components/pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<div className="w-full"><LoginForm /></div>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;