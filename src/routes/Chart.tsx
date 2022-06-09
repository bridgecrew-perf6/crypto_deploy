import { useQuery } from "react-query";
import { fetchCoinForChart, fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinForChart(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Chart",
              data: data?.map(chart => {
                return {
                  x: new Date(chart?.time_close),
                  y: [
                    chart?.open.toFixed(0),
                    chart?.high.toFixed(0),
                    chart?.low.toFixed(0),
                    chart?.close.toFixed(0),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: "#96A0FF",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#96A0FF",
                  downward: "#FF971E",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
