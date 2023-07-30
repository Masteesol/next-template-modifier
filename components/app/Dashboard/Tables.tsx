import { FlexRowCenteredY } from '@/components/shared/styled-global-components'
import { TemplateModified } from '@/types/global';
import colors from '@/utils/colors'
import { Table } from 'flowbite-react'
import React from 'react'
import { TemplateChecker } from './shared/helpers';

interface TablesProps {
    textTemplates: TemplateModified[];
}

export const TablesSingleTemplate = ({ textTemplates }: TablesProps) => {
    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>
                    Template Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Category
                </Table.HeadCell>
                <Table.HeadCell>
                    Copied
                </Table.HeadCell>
                <Table.HeadCell>
                    Characters
                </Table.HeadCell>
                <Table.HeadCell>
                    Excerpt
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {textTemplates.map((template: any, index: number) => {
                    //console.log("item", template)
                    return index < 5 &&
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={`table-row-${index}`}
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <FlexRowCenteredY className="gap-2">
                                    <span className="rounded-full w-3 h-3" style={{ backgroundColor: colors[index] }} />
                                    <p>{template.title}</p>
                                </FlexRowCenteredY>
                            </Table.Cell>
                            <Table.Cell>
                                {template.category_name}
                            </Table.Cell>
                            <Table.Cell>
                                {template.copy_count}
                            </Table.Cell>
                            <Table.Cell>
                                {template.text.length}
                            </Table.Cell>
                            <Table.Cell >
                                <p className="min-w-[10rem]">
                                    {`${template.text.substring(0, 40)}...`}
                                </p>
                            </Table.Cell>
                        </Table.Row>
                })
                }
            </Table.Body>
        </Table>
    )
}

export const TablesTemplateCollection = ({ textTemplates }: TablesProps) => {
    const checkerCollection = new TemplateChecker(textTemplates, true);

    return (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>
                    Template Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Category
                </Table.HeadCell>
                <Table.HeadCell>
                    Copied
                </Table.HeadCell>
                <Table.HeadCell>
                    Characters
                </Table.HeadCell>
                <Table.HeadCell>
                    Excerpt
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {checkerCollection.result.map((template: TemplateModified, index: number) => {
                    //console.log("item", template)
                    return index < 5 && template.is_collection &&
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={`table-row-${index}`}
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <FlexRowCenteredY className="gap-2">
                                    <span className="rounded-full w-3 h-3" style={{ backgroundColor: colors[index] }} />
                                    <p>{template.title}</p>
                                </FlexRowCenteredY>
                            </Table.Cell>
                            <Table.Cell>
                                {template.category_name}
                            </Table.Cell>
                            <Table.Cell>
                                {template.copy_count}
                            </Table.Cell>
                            <Table.Cell>
                                {template.text.length}
                            </Table.Cell>
                            <Table.Cell >
                                <p className="min-w-[10rem]">
                                    {`${template.text.substring(0, 40)}...`}
                                </p>
                            </Table.Cell>
                        </Table.Row>
                })
                }
            </Table.Body>
        </Table>
    )
}