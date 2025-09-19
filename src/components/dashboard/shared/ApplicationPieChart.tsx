import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import React from "react";
import { LabelList, Pie, PieChart } from "recharts";

export type ChartData = {
  id: string;
  value: number;
  label: string;
  fill: `#${string}`;
}[];

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ApplicationChartLegendProps = {
  chartData?: ChartData; // Made optional since it will be injected
  formatter?: (item: ChartData[number]) => string;
  className?: string;
};

type ApplicationPieChart = {
  className?: string;
  chartData: ChartData;
  children?: React.ReactNode;
  formatter?: (item: ChartData[number]) => string; // Formatter is now on the main component
};

export default function ApplicationPieChart(props: ApplicationPieChart) {
  // Simple chartConfig that works with direct colors
  const chartConfig: ChartConfig = {
    value: {
      label: "Applications",
    },
    ...Object.fromEntries(
      props.chartData.map((item) => [
        item.id,
        {
          label: item.label,
          color: item.fill,
        },
      ])
    ),
  };

  // Clone children and inject chartData and formatter
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        chartData: props.chartData,
        formatter: props.formatter,
        ...(child.props as ApplicationChartLegendProps), // Preserve any existing props
      });
    }
    return child;
  });

  return (
    <div
      className={cn(
        "flex  items-center justify-center w-full",
        props.className
      )}
    >
      {/* Chart Container */}
      <div className="flex-shrink-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[400px] w-full min-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={props.chartData}
              dataKey="value"
              nameKey="label"
              fill="#8884d8"
              className=""
            >
              <LabelList
                dataKey="label"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(label: string) => label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Legend with injected props */}
      {childrenWithProps}
    </div>
  );
}
