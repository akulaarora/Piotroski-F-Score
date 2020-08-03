import React, {FC, useState} from "react";
import {parse} from 'papaparse'
import {useTable, Column} from 'react-table'

export const Table: FC = () => {
    const [data, setData] = useState([])
    const names: string[] = ['ticker', 'name', 'score', 'roa', 'ocf', 'deltaroa', 'accruals', 'deltacurrent', 'deltaleverage', 'deltashares', 'deltagross', 'deltaturnover']

    parse('data.csv', {
        download: true,
        complete: (output) => {
            let temp: any = []
            output.data.map((row: any) => {
                const obj = names.reduce((accumulator: any, currentValue: string, index) => {
                    accumulator[currentValue] = row[index];
                    return accumulator;
                }, {});

                temp.push(obj)
            })
            setData(temp)
        }
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<any>({
        columns,
        data,
    })

    if (data.length === 0) {
        return (
            <p>Loading from CSV...</p>
        )
    }

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row: any, i: number) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

const columns: { accessor: string, Header: string }[] = [
    {
        accessor: 'ticker',
        Header: "Ticker"
    },
    {
        accessor: 'name',
        Header: "Name",
    },
    {
        accessor: 'score',
        Header: "Piotroski F-Score",
    },
    {
        accessor: 'roa',
        Header: "Return on Assets",
    },
    {
        accessor: 'ocf',
        Header: "Operating Cash Flow",
    },
    {
        accessor: 'deltaroa',
        Header: "Change in ROA",
    },
    {
        accessor: 'accruals',
        Header: "Accruals"
    },
    {
        accessor: 'deltacurrent',
        Header: "Change in Current Ratio",
    },
    {
        accessor: 'deltaleverage',
        Header: "Change in Leverage",
    },
    {
        accessor: 'deltashares',
        Header: "Change in # of Shares",
    },
    {
        accessor: 'deltagross',
        Header: "Change in Gross Margin",
    },
    {
        accessor: 'deltaturnover',
        Header: "Change in Asset Turnover Ratio",
    },
]
