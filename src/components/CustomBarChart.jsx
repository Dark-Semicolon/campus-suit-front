import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function CustomBarChart({ data, barDataKey, xLable, yLable, barColor }) {
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={700}
                data={data}
                margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 30,
                }}
                barSize={15}
            >
                <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 100, right: 100 }}
                    label={{
                        value: xLable,
                        position: "insideBottomRight",
                        offset: -30,
                    }}
                    tick={{ dy: 15 }}
                />
                <YAxis
                    label={{
                        value: yLable,
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="5 5" />
                <Bar
                    dataKey={barDataKey}
                    fill={barColor}
                    // barCategoryGap={30}
                    // barGap={10}
                    background={{ fill: "#eee" }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarChart;
