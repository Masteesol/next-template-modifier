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
                    const excerpt = template.text.length > 120 ? `${template.text.substring(0, 120)}...` : template.text
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
                                <p className="min-w-[10rem] lg:hidden">
                                    {`${template.text.substring(0, 40)}...`}
                                </p>
                                <p className="hidden lg:block min-w-[20rem]">
                                    {excerpt}
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
    //console.log(checkerCollection.result)
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
                    Templates
                </Table.HeadCell>
                <Table.HeadCell>
                    {`Excerpt from collection`}
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {checkerCollection.result.map((template: TemplateModified, index: number) => {
                    const text = checkerCollection.result[index].template_collections[0].text
                    const excerpt = text.length > 120 ? `${text.substring(0, 120)}...` : text
                    return index < 5 && template.is_collection &&
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={`table-row-${index}`}
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <FlexRowCenteredY className="gap-2">
                                    <span className="rounded-full w-3 h-3" style={{ backgroundColor: colors[index + 5] }} />
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
                                {checkerCollection.result[index].template_collections.length}
                            </Table.Cell>
                            <Table.Cell>
                                <p className="min-w-[10rem] lg:hidden">
                                    {`${checkerCollection.result[index].template_collections[0].text.substring(0, 40)}...`}
                                </p>
                                <p className="hidden lg:block min-w-[20rem]">
                                    {excerpt}
                                </p>
                            </Table.Cell>
                        </Table.Row>
                })
                }
            </Table.Body>
        </Table>
    )
}