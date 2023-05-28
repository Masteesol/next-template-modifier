import React from 'react'
import { Table } from "flowbite-react";
import { FlexRowCenteredY } from '@/components/styled-global-components';
import tw from 'tailwind-styled-components';
import getOpacityTheme from '../opacityTheme';

const Circle = tw.div`
    h-[1rem]
    w-[1rem]
    rounded-full
`
const TableComponent = ({ data, theme, label }: any) => {
    const opacity = getOpacityTheme(theme);
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>{label}</Table.HeadCell>
                <Table.HeadCell>%</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data.map((item: any, index: number) => {
                    return (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <FlexRowCenteredY className="gap-2">
                                    <Circle style={{ backgroundColor: opacity[index] }} />
                                    <span>{item.name}</span>
                                </FlexRowCenteredY>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.value}
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default TableComponent