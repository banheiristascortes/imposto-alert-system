import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StateData {
  state: string;
  changes: number;
}

const stateData: StateData[] = [
  { state: "SP", changes: 12 },
  { state: "RJ", changes: 8 },
  { state: "MG", changes: 6 },
  { state: "RS", changes: 5 },
  { state: "PR", changes: 4 },
];

export const BrazilMap = () => {
  const [activeState, setActiveState] = useState<string | null>(null);

  const getStateColor = (state: string) => {
    const stateInfo = stateData.find((s) => s.state === state);
    if (!stateInfo) return "#e5e7eb"; // Default color for states without changes
    
    // Color intensity based on number of changes
    const maxChanges = Math.max(...stateData.map(s => s.changes));
    const intensity = stateInfo.changes / maxChanges;
    return `rgba(30, 58, 138, ${0.2 + intensity * 0.8})`; // Using the blue color (#1E3A8A) with varying opacity
  };

  return (
    <div className="w-full h-[400px] relative">
      <svg
        viewBox="0 0 960 1000"
        className="w-full h-full"
      >
        <TooltipProvider>
          {/* São Paulo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M580 640 l40 20 30 40 -20 30 -40 10 -30 -20 -20 -40 z"
                fill={getStateColor("SP")}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => setActiveState("SP")}
                onMouseLeave={() => setActiveState(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-semibold">São Paulo</h3>
                <p>{stateData.find(s => s.state === "SP")?.changes || 0} alterações fiscais</p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Rio de Janeiro */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M620 630 l30 10 20 20 -10 20 -30 -10 -20 -20 z"
                fill={getStateColor("RJ")}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => setActiveState("RJ")}
                onMouseLeave={() => setActiveState(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-semibold">Rio de Janeiro</h3>
                <p>{stateData.find(s => s.state === "RJ")?.changes || 0} alterações fiscais</p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Minas Gerais */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M560 580 l60 20 40 30 -30 40 -50 -10 -40 -30 z"
                fill={getStateColor("MG")}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => setActiveState("MG")}
                onMouseLeave={() => setActiveState(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-semibold">Minas Gerais</h3>
                <p>{stateData.find(s => s.state === "MG")?.changes || 0} alterações fiscais</p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Rio Grande do Sul */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M520 780 l40 30 30 20 -20 30 -40 -20 -30 -30 z"
                fill={getStateColor("RS")}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => setActiveState("RS")}
                onMouseLeave={() => setActiveState(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-semibold">Rio Grande do Sul</h3>
                <p>{stateData.find(s => s.state === "RS")?.changes || 0} alterações fiscais</p>
              </div>
            </TooltipContent>
          </Tooltip>

          {/* Paraná */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M540 700 l40 20 30 30 -20 20 -40 -10 -30 -30 z"
                fill={getStateColor("PR")}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => setActiveState("PR")}
                onMouseLeave={() => setActiveState(null)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <h3 className="font-semibold">Paraná</h3>
                <p>{stateData.find(s => s.state === "PR")?.changes || 0} alterações fiscais</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </svg>
    </div>
  );
};