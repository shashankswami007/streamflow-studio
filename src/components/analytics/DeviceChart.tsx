import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DeviceChartProps {
  data: { type: string; count: number; percentage: number }[];
}

const COLORS = ['hsl(187 100% 42%)', 'hsl(25 95% 53%)', 'hsl(142 76% 36%)'];

export function DeviceChart({ data }: DeviceChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="count"
            nameKey="type"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222 47% 10%)',
              border: '1px solid hsl(222 30% 18%)',
              borderRadius: '8px',
              color: 'hsl(210 40% 98%)',
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} (${data.find((d) => d.type === name)?.percentage}%)`,
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
