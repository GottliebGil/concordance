import React from 'react';
import {WordPopularity} from "../../entities/Stats";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TableComponents} from "react-virtuoso";
import {Paper} from "@mui/material";
import {TableVirtuoso} from 'react-virtuoso';

type WordPopularityTableProps = {
    wordPopularity: WordPopularity[]
}


interface ColumnData {
    dataKey: keyof WordPopularity;
    label: string;
    numeric?: boolean;
    width: number;
}


const columns: ColumnData[] = [
    {
        width: 200,
        label: 'Bare word',
        dataKey: 'bare_word',
    },
    {
        width: 120,
        label: 'Total Usages',
        dataKey: 'total_usages',
        numeric: true,
    },
    {
        width: 120,
        label: 'Songs used',
        dataKey: 'songs_used',
        numeric: true,
    }
];

const VirtuosoTableComponents: TableComponents<WordPopularity> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref}/>
    )),
    Table: (props) => (
        <Table {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed'}}/>
    ),
    TableHead,
    TableRow: ({item: _item, ...props}) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref}/>
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{width: column.width}}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: WordPopularity) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

const WordPopularityTable: React.FC = ({wordPopularity}: WordPopularityTableProps) => {
    return (
        <Paper style={{height: 400, width: '100%'}}>
            <TableVirtuoso
                data={wordPopularity}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
        </Paper>
    )
}

export default WordPopularityTable;