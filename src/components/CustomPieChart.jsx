import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CustomPieChart({ data = [], title }) {
    return (
        <div>
            <h2 className="mb-5 text-xl capitalize md:text-xl text-blue-color-light">
                {title}
            </h2>

            <div className="flex justify-center items-center flex-col border-3 rounded-xl w-full max-w-[400px]">
                <ResponsiveContainer width='100%' className='px-5' height={280} >

                    <PieChart>
                        <Pie
                            data={data}
                            nameKey='name'
                            dataKey='data'
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
