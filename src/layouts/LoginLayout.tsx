import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <TooltipProvider>
      <div className="w-full">
        {children}
      </div>
      <Toaster />
      <SonnerToaster />
    </TooltipProvider>
  );
};