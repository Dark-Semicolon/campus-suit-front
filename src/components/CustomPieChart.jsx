import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CustomPieChart({ data = [], title }) {
    return (
        <div>
            <h2 className="mb-5 text-xl capitalize md:text-xl text-blue-color-light">
                {title}
            </h2>

            <div className="flex flex-col items-center justify-center w-full rounded-xl ">
                <ResponsiveContainer width='100%' height={350} >

                    <PieChart>
                        <Pie
                            data={data}
                            nameKey='name'
                            dataKey='data'
                            cy={'55%'}
                            outerRadius={83}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} stroke={'#ffff'} />
                            ))}
                        </Pie>
                        <Tooltip itemStyle={{ color: '#172b4d', borderRadius: '5px' }} />
                        <Legend verticalAlign="top" align="left" width='100%' layout="horizontal" iconSize={15} iconType="circle" />
                    </PieChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CustomPieChart;
