import { Brush } from "@mui/icons-material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    // Legend,
    ResponsiveContainer,
    // LabelList,
} from "recharts";

function CustomBarChart({ data, barDataKey, xLable, yLable, barColor }) {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 50,
                    left: 50,
                    bottom: 50,
                }}
                barSize={50}
                barGap={10}
            >
                <XAxis
                    type="category"
                    dataKey="name"
                    tickMargin={10}
                    padding={{ left: 40, right: 40 }}
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
                <Brush dataKey="name" height={90} stroke="#4E74F9" y={700} />
                {/* <Legend /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey={barDataKey}
                    fill={barColor}
                    background={{ fill: "#eee" }}
                >
                    {/* <LabelList dataKey="name" position="bottom" /> */}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarChart;
