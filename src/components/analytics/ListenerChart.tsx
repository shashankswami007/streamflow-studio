import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ListenerChartProps {
  data: { hour?: string; day?: string; listeners: number }[];
  type: 'hourly' | 'weekly';
}

export function ListenerChart({ data, type }: ListenerChartProps) {
  const xKey = type === 'hourly' ? 'hour' : 'day';

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="listenerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(187 100% 42%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(187 100% 42%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke="hsl(215 20% 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(215 20% 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222 47% 10%)',
              border: '1px solid hsl(222 30% 18%)',
              borderRadius: '8px',
              color: 'hsl(210 40% 98%)',
            }}
            formatter={(value: number) => [value.toLocaleString(), 'Listeners']}
          />
          <Area
            type="monotone"
            dataKey="listeners"
            stroke="hsl(187 100% 42%)"
            strokeWidth={2}
            fill="url(#listenerGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
