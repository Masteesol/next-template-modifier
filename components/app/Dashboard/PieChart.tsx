import dynamic from 'next/dynamic';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react"
import colors from '@/utils/colors';

const PieChartComponent = ({ textTemplates }: any) => {
    const [isJSenabled, setIsJSenabled] = useState(false);

    useEffect(() => {
        setIsJSenabled(true);
    }, []);

    if (!isJSenabled) {
        return null;
    }

    // Filter the data you want to use for both the pie slices and cells
    const filteredData = textTemplates.filter((item: any, index: number) => index < 5 && item);

    return (
        <ResponsiveContainer width="80%" height={320}>
            <PieChart>
                <Pie
                    data={filteredData}
                    dataKey="copy_count"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    cornerRadius={5}
                >
                    {
                        filteredData.map(
                            (entry: any, index: number) => {
                                return <Cell key={`cell-${index}`} fill={colors[index]} />
                            }
                        )
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer >
    )
}

const DynamicPieChartComponent = dynamic(() => Promise.resolve(PieChartComponent), { ssr: false });

export default DynamicPieChartComponent;
