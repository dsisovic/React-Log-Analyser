import React from "react";
import { ILineOptions } from "./line-options.model";
import { IDoughnutOptions } from "./doughnut-options.model";

export interface IChartProps {
  children?: React.ReactNode;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill?: boolean;
      backgroundColor: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[]; 
  };
  options: IDoughnutOptions | ILineOptions;
  width: number;
  height: number;
}