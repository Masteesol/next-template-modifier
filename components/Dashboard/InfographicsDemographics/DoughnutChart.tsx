import dynamic from 'next/dynamic';
import { PieChart, Pie, Tooltip, Cell, Label } from "recharts";
import { useState, useEffect } from "react"
import getOpacityTheme from '../opacityTheme';
//import colors from 'tailwindcss/colors';
// Define colors for each age group


type PieChartProps = {
    dataPie: { name: string; value: number }[];
    theme: string | null
    label: string
};



const PieChartComponent: React.FC<PieChartProps> = ({ dataPie, theme, label }) => {
    // We'll use a React state to track if JavaScript is enabled.
    const [isJSenabled, setIsJSenabled] = useState(false);

    useEffect(() => {
        // If this useEffect callback runs, we know that JavaScript is enabled on the client.
        setIsJSenabled(true);
    }, []);

    // If JavaScript isn't enabled yet, we don't render the PieChart.
    if (!isJSenabled) {
        return null;
    }

    const colors = getOpacityTheme(theme)

    return (
        <PieChart width={300} height={300}>
            <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
            >
                {
                    dataPie.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
                <Label value={label} position="center" style={{ fontSize: '24px' }} />
            </Pie>
            <Tooltip />
        </PieChart>
    )
}

const DynamicPieChartComponent = dynamic(() => Promise.resolve(PieChartComponent), { ssr: false });

export default DynamicPieChartComponent;
