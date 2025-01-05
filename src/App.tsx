import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { NotificationsPage } from "./components/NotificationsPage";
import { AppSidebar } from "./components/AppSidebar";
import { UserProfile } from "./components/profile/UserProfile";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div className="w-full"><LoginForm /></div>} />
            <Route
              path="/*"
              element={
                <div className="flex w-full">
                  <AppSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route
                        path="/notifications"
                        element={<NotificationsPage />}
                      />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}