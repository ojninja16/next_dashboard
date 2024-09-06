import React, { useState, useEffect } from 'react';
import CandlestickChart from '../components/charts/CandleStickChart';
import LineChartComponent from '../components/charts/LineChart';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BarChart, LineChart, PieChart, CandlestickChart as CandlestickIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
interface ChartData {
  candlestick: any;
  line: any;
  bar: any;
  pie: any;
}
const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    candlestick: null,
    line: null,
    bar: null,
    pie: null,
  });
  const [loading, setLoading] = useState(true);
  const fetchChartData = async (endpoint: string) => {
    try {
      const response = await axios.get(`/api/data?endpoint=${endpoint}`);
      return response.data; 
    } catch (error:any) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          toast.error(`Client Error: ${error.response.status} - ${error.response.data.detail || 'Something went wrong'}`);
        } else if (error.response.status >= 500) {
          toast.error(`Server Error: ${error.response.status} - Please try again later.`);
        }
      } else if (error.request) {
        toast.error('No response from the server. Please check your network.');
      } else {
        toast.error(`Error: ${error.message}`);
      }
      throw new Error(`Failed to fetch ${endpoint} data`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.allSettled([
        fetchChartData('candlestick-data'),
        fetchChartData('line-chart-data'),
        fetchChartData('bar-chart-data'),
        fetchChartData('pie-chart-data'),
      ]);
      const newChartData: Partial<ChartData> = {};
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          switch (index) {
            case 0:
              newChartData.candlestick = result.value;
              break;
            case 1:
              newChartData.line = result.value;
              break;
            case 2:
              newChartData.bar = result.value;
              break;
            case 3:
              newChartData.pie = result.value;
              break;
            default:
              break;
          }
        } else {
          toast.error(result.reason.message);
        }
      });
      setChartData(prevState => ({
        ...prevState,
        ...newChartData
      }));
      setLoading(false); 
    };
    fetchData();
  }, []);

  const ChartCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <Card className="shadow-lg rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
        <Badge variant="outline" className="text-sm font-medium">
          {icon}
        </Badge>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Financial Insights 
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visualizing market trends and financial data for informed decision-making
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="shadow-lg rounded-lg border border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-700">Loading...</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="w-full h-[320px]" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <ChartCard title="Stock Performance" icon={<CandlestickIcon className="h-8 w-8" />}>
                <CandlestickChart data={chartData.candlestick} />
              </ChartCard>
              <ChartCard title="Revenue Trends" icon={<LineChart className="h-8 w-8 " />}>
                <LineChartComponent data={chartData.line} />
              </ChartCard>
              <ChartCard title="Quarterly Results" icon={<BarChart className="h-8 w-8" />}>
                <BarChartComponent data={chartData.bar} />
              </ChartCard>
              <ChartCard title="Market Share" icon={<PieChart className="h-8 w-8" />}>
                <PieChartComponent data={chartData.pie} />
              </ChartCard>
            </>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <div className="flex items-center justify-center">
          <p className="text-md text-gray-600 font-semibold">Crafted with ❤️ by Ojas</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;