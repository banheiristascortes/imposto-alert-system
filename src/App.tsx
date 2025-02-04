import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MainLayout } from "./layouts/MainLayout";
import { LoginLayout } from "./layouts/LoginLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { UserProfile } from "./components/profile/UserProfile";
import { FAQ } from "./components/pages/FAQ";
import { Documentation } from "./components/pages/Documentation";
import { Settings } from "./components/pages/Settings";
import { ReportsPage } from "./pages/ReportsPage";
import { ROUTES } from "./constants/app";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <LoginLayout>
                  <LoginPage />
                </LoginLayout>
              }
            />
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                    <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
                    <Route path={ROUTES.PROFILE} element={<UserProfile />} />
                    <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
                    <Route path={ROUTES.FAQ} element={<FAQ />} />
                    <Route path={ROUTES.DOCS} element={<Documentation />} />
                    <Route path={ROUTES.SETTINGS} element={<Settings />} />
                    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;