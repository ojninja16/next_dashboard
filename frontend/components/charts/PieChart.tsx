import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PieChartData {
  labels: string[];
  datasets: [{
    data: number[];
    backgroundColor: string[];
  }];
}
interface PieChartProps {
  data: PieChartData | null;
}
const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  if (!data ) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }
  const dataset = data.data.datasets[0];  
  const transformedData = data.data.labels.map((label:string, index:number) => ({
    name: label,
    value: dataset.data[index],
  }));
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        {/* <CardTitle>Pie Chart</CardTitle> */}
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={transformedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {transformedData.map((entry:any, index:number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={dataset.backgroundColor[index % dataset.backgroundColor.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;