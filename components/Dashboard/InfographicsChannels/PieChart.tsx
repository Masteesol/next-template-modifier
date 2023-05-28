import dynamic from 'next/dynamic';
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useState, useEffect } from "react"
import { opacity } from '../opacityTheme';

//import colors from 'tailwindcss/colors';
// Define colors for each age group


type PieChartProps = {
    dataPie: { name: string; value: number }[];
    theme: string | null;
    index: number
};



const PieChartComponent: React.FC<PieChartProps> = ({ dataPie, theme, index }) => {
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


    return (
        <PieChart width={200} height={200}>
            <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
            >
                {
                    dataPie.map(
                        (entry: any, indexInner: number) =>
                            <Cell key={`cell-${indexInner}`} fill={theme ? (indexInner === index ? theme : `${theme}${opacity[6]}`) : "#8884d8"} />
                    )
                }
            </Pie>
            <Tooltip />
        </PieChart>
    )
}

const DynamicPieChartComponent = dynamic(() => Promise.resolve(PieChartComponent), { ssr: false });

export default DynamicPieChartComponent;
