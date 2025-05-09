
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { LoanStatus, loanProcessesData } from '@/data/loanData';

const getStageValue = (stage: LoanStatus) => loanProcessesData.filter(item => item.status === stage).length;

// Stage distribution data
const stageData = [
  { name: "Initiation", value: getStageValue('Initiation') },
  // { name: "Processing", value: 18 },
  { name: "Review", value: getStageValue('Review') },
  // { name: "Approval", value: 7 },
  { name: "Payment", value: getStageValue('Payment') },
  { name: "Completion", value: getStageValue('Completion') }
];

// Monthly loan volume data
const monthlyData = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 52 },
  { name: "Mar", value: 49 },
  { name: "Apr", value: 63 },
  { name: "May", value: 75 }
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart - Loan Process Stages */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Loan Process Stages</h3>
        <ChartContainer 
          config={{ primary: { color: "#0088FE" } }}
          className="w-full h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {stageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {/* Bar Chart - Monthly Loan Volume */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Monthly Loan Volume</h3>
        <ChartContainer 
          config={{ primary: { color: "#0088FE" } }}
          className="w-full h-[300px]"
        >
          <BarChart data={monthlyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar 
              dataKey="value" 
              fill="#0088FE" 
              radius={[4, 4, 0, 0]} 
              name="Loans Processed"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
