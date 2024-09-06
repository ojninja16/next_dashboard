import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time, TimeFormatter } from 'lightweight-charts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CandlestickChartProps {
  data: {
    data: CandlestickData[];
  } | null;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (chartContainerRef.current && data) {
      const handleResize = () => {
        chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      const timeFormatter: TimeFormatter = (time: Time) => {
        const date = new Date(time * 1000);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      };

      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: 'black',
        },
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: timeFormatter,
        },
        autoSize: true,
      });

      seriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
      });
      const formattedData: CandlestickData[] = data.data.data.map((item) => ({
        time: new Date(item.x).getTime() / 1000, // Convert 'x' to UNIX timestamp
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
      seriesRef.current.setData(formattedData);
      // Set visible range to last 30 data points
      const timeScale = chartRef.current.timeScale();
      timeScale.setVisibleLogicalRange({
        from: formattedData.length - 30,
        to: formattedData.length - 1,
      });
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chartRef.current?.remove();
      };
    }
  }, [data]);

  if (!data) {
    return (
      <Card className="w-full h-[400px]">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[400px]">
      <CardContent>
        <div ref={chartContainerRef} className="w-full h-[325px]" />
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;