import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CustomPieChart({ data = [], title }) {
  return (
    <div>
      <h2 className="mb-5 text-xl md:text-3xl text-blue-color-primary">
        أحصائيات <span className="text-blue-color-light">{title} </span>
      </h2>

      <ResponsiveContainer
        width={250}
        height={300}
        className="py-5 border-3 rounded-xl w-full max-w-[400px]"
      >
        <PieChart>
          <Pie data={data} nameKey="name" dataKey="data" outerRadius={83}>
            {data?.map((entry) => (
              <Cell key={entry.data} fill={entry.color} stroke={"#ffff"} />
            ))}
          </Pie>
          <Tooltip itemStyle={{ color: "#172b4d", borderRadius: "5px" }} />
          <Legend
            verticalAlign="top"
            align="right"
            width="100%"
            layout="horizontal"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomPieChart;
