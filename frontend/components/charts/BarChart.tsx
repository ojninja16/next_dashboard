import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type BarChartDataProps = {
  data: { labels: string[]; data: number[] };
};

const BarChartComponent = ({ data }: BarChartDataProps) => {
  if (!data ) return <div><Card className="w-full h-[400px]"> <CardContent className="flex items-center justify-center h-full">
  <p className="text-gray-500">Loading...</p>
</CardContent></Card></div>;
  const chartData = data.data.labels.map((label:string, index:number) => {
    const item: any = { name: label };
    data.data.datasets.forEach(dataset => {
      item[dataset.label] = dataset.data[index];
    });
    return item;
  });
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
  return (
    <ResponsiveContainer width="100%" height={375}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.data.datasets.map((dataset, index) => (
          <Bar
            key={dataset.label}
            // type="monotone"
            dataKey={dataset.label}
            stroke='#8884d8'
            // activeDot={{ r: 8 }}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
