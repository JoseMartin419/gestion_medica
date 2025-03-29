import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import './PacientesPage.css';  // Archivo de estilos

const PacientesPage = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/consultas/')
      .then((response) => {
        setConsultas(response.data.results || []);
      })
      .catch((error) => {
        console.error('Error al obtener consultas:', error);
      });
  }, []);

  // Definir columnas para la tabla
  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'nombre',
      header: 'Nombre del Paciente',
    },
    {
      accessorKey: 'fecha_nacimiento',
      header: 'Fecha de Nacimiento',
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <button
          onClick={() => alert(`Ver detalles de: ${row.original.nombre}`)}
          className="btn-ver"
        >
          Ver Detalles
        </button>
      ),
    },
  ];

  // Crear instancia de tabla con `useReactTable`
  const table = useReactTable({
    data: consultas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="contenedor">
      <h2 className="titulo">📋 Lista de Consultas</h2>
      <table className="tabla-consultas">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="paginacion">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ⏪ Anterior
        </button>
        <span>
          Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente ⏩
        </button>
      </div>
    </div>
  );
};

export default PacientesPage;
