"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableColumnHeader } from "./data-table-column-header"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("")
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className="rounded-lg border border-gray-200 shadow-md">
            <div style={{ margin: '10px' }}>

                <Input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="mb-4 border rounded p-2 w-50"
                    style={{ padding: '10px' }}
                />

            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup, index) => (
                        <TableRow key={headerGroup.id + index}>
                            {headerGroup.headers.map((header, index) => (

                                <TableHead className="bg-gray-100" key={header.id}>
                                    <DataTableColumnHeader column={header.column} title={flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )} />
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="border-t">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 gap-3 py-4" style={{ padding: '10px' }}>
                <DataTablePagination table={table} />
            </div>

        </div>
    )
}
