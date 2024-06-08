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

function CustomBarChart({
    data,
    xDataKey,
    barDataKey,
    xLable,
    yLable,
    barColor,
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
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
                    dataKey={xDataKey}
                    scale="point"
                    padding={{ left: 50, right: 20 }}
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
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey={barDataKey}
                    fill={barColor}
                    background={{ fill: "#eee" }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarChart;
