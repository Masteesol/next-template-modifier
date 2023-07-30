import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import colors from '@/utils/colors';

export const PieChartComponentSingle = ({ textTemplates }: any) => {
    const filteredData = textTemplates.filter((item: any, index: number) => index < 5 && item);

    return (
        <ResponsiveContainer width="80%" height={window.innerWidth < 900 ? 220 : 370}>
            <PieChart>
                <Pie
                    data={filteredData}
                    dataKey="copy_count"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 900 ? 110 : 170}
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

export const PieChartComponentCollection = ({ textTemplates }: any) => {

    const filteredData = textTemplates.filter((item: any, index: number) => index < 5 && item);

    return (
        <ResponsiveContainer width="80%" height={window.innerWidth < 900 ? 220 : 370}>
            <PieChart>
                <Pie
                    data={filteredData}
                    dataKey="copy_count"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 900 ? 110 : 170}
                    cornerRadius={5}
                >
                    {
                        filteredData.map(
                            (entry: any, index: number) => {
                                return <Cell key={`cell-${index}`} fill={colors[index + 5]} />
                            }
                        )
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer >
    )
}
