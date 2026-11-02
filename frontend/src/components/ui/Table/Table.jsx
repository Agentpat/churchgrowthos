import {
    TableWrapper,
    TableScroll,
    StyledTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    EmptyState,
    EmptyStateTitle,
    EmptyStateDescription,
} from "./Table.styles";


// =====================================
// Table
// =====================================

const Table = ({
    columns = [],
    data = [],
    emptyMessage = "No records found.",
    rowKey = "_id",
}) => {

    // =====================================
    // Row Key
    // =====================================

    const getRowKey = (item, index) => {

        if (typeof rowKey === "function") {
            return rowKey(item, index);
        }

        return item?.[rowKey] || index;
    };


    // =====================================
    // Empty State
    // =====================================

    if (!Array.isArray(data) || data.length === 0) {

        return (
            <TableWrapper>

                <EmptyState>

                    <EmptyStateTitle>
                        {emptyMessage}
                    </EmptyStateTitle>

                    <EmptyStateDescription>
                        There are no records to display here yet.
                    </EmptyStateDescription>

                </EmptyState>

            </TableWrapper>
        );
    }


    // =====================================
    // Table
    // =====================================

    return (

        <TableWrapper>

            <TableScroll>

                <StyledTable>

                    {/* =========================
                        Header
                    ========================== */}

                    <TableHead>

                        <tr>

                            {columns.map(
                                (column, index) => (

                                    <TableHeader
                                        key={
                                            column.header ||
                                            `column-${index}`
                                        }
                                        $width={
                                            column.width
                                        }
                                        $align={
                                            column.align ||
                                            "left"
                                        }
                                    >

                                        {column.header}

                                    </TableHeader>

                                ),
                            )}

                        </tr>

                    </TableHead>


                    {/* =========================
                        Body
                    ========================== */}

                    <TableBody>

                        {data.map(
                            (item, index) => (

                                <TableRow
                                    key={
                                        getRowKey(
                                            item,
                                            index,
                                        )
                                    }
                                >

                                    {columns.map(
                                        (
                                            column,
                                            columnIndex,
                                        ) => (

                                            <TableCell
                                                key={
                                                    column.header ||
                                                    `cell-${columnIndex}`
                                                }
                                                $align={
                                                    column.align ||
                                                    "left"
                                                }
                                            >

                                                {
                                                    typeof column.accessor ===
                                                        "function"

                                                        ? column.accessor(
                                                            item,
                                                            index,
                                                        )

                                                        : item?.[
                                                        column.accessor
                                                        ]
                                                }

                                            </TableCell>

                                        ),
                                    )}

                                </TableRow>

                            ),
                        )}

                    </TableBody>

                </StyledTable>

            </TableScroll>

        </TableWrapper>

    );
};


export default Table;