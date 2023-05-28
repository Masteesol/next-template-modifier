import {
    FlexColCentered,
    FlexColCenteredY,
    FlexColRowContainer,
    FlexColRowContainerLg,
} from "@/components/styled-global-components";

import DynamicPieChartComponent from "@/components/Dashboard/InfographicsDemographics/DoughnutChart";
import TableComponent from "../Components/Table";


type DataItem = {
    name: string;
    value: number;
}

interface Demographics {
    dataAges: DataItem[]
    dataDemography: DataItem[]
    theme: string | null
}


const Demographics = ({ dataAges, dataDemography, theme }: Demographics) => {
    //const secondary = selectedCompany?.theme?.colors?.secondary.background;
    //const highlighted = selectedCompany?.theme?.colors?.highlighted;
    return (
        <FlexColRowContainer className="w-full justify-center border-[1px] border-slate-200 rounded p-4">
            <FlexColRowContainerLg>
                <FlexColCentered >
                    <DynamicPieChartComponent dataPie={dataDemography} theme={theme} label={"Gender"} />
                </FlexColCentered>
                <FlexColCenteredY className="max-w-[200px] flex-1">
                    <TableComponent data={dataDemography} theme={theme} label={"Gender"} />
                </FlexColCenteredY>
            </FlexColRowContainerLg>
            <FlexColRowContainerLg>
                <FlexColCentered>
                    <DynamicPieChartComponent dataPie={dataAges} theme={theme} label={"Ages"} />
                </FlexColCentered>
                <FlexColCenteredY className="max-w-[200px] flex-1">
                    <TableComponent data={dataAges} theme={theme} label={"Ages"} />
                </FlexColCenteredY>
            </FlexColRowContainerLg>
        </FlexColRowContainer>
    )
}

export default Demographics;