'use client';
import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import axios from 'axios';
import DomainForm from './Forms/DomainForm';
import EditPopUp from './EditPopUp';

export default function Domain() {
  const [tableData, setTableData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Fetch data from the API
  const fetchDomains = async () => {
    try {
      const response = await axios.get('https://expirio.vercel.app/api/Domains');
      const data = response.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      setTableData(data);
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  // Define columns
  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'sr no',
        header: 'Sr No',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'phone',
        header: 'Phone No.',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'service',
        header: 'Service',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'sDate',
        header: 'Launch Date',
        size: 150, // Adjust size as needed
        cell: ({ getValue }) => <div style={{ whiteSpace: 'nowrap' }}>{getValue()}</div>,
      },
      {
        accessorKey: 'eDate',
        header: 'Expiry Date',
        size: 150, // Adjust size as needed
        cell: ({ getValue }) => <div style={{ whiteSpace: 'nowrap' }}>{getValue()}</div>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div>
            <button className='btn btn-outline-dark m-2' onClick={() => editRecord(row.original)}>Edit</button>
            <button className='btn btn-outline-danger m-2' onClick={() => deleteRecord(row.original['sr no'])}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`https://expirio.vercel.app/api/Domains?id=${id}`);
      if (response.data.message === 'Record successfully deleted') {
        alert('Record successfully deleted');
        fetchDomains(); // Refresh data
      } else {
        alert('Failed to delete record');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // Function to handle adding a domain and updating the table data
  const handleAddDomain = async (newDomain) => {
    // Update the server with the new domain (same as your DomainForm logic)
    const response = await axios.post('https://expirio.vercel.app/api/Domains', newDomain);

    if (response.data.message === 'Domain successfully added') {
      alert('Record added successfully');
      // Fetch updated data and set state
      fetchDomains(); // Re-fetch and update TableData
    } else {
      alert('Record failed to add');
    }
  };

  const [Popup, setPopup] = useState(false)
  const [CurrentRecord, setCurrentRecord] = useState([]);


  
  const editRecord = (srNo) => {
    console.log(srNo)
    if(srNo){
      setCurrentRecord(srNo)
      setPopup(true)
    }
    else{
      console.error('Record not found for editing')
    }
    
  };


  const handleUpdate = async (updatedRecord) => {
    try {
      const response = await axios.put(`https://expirio.vercel.app/api/Domains`, updatedRecord);
      if (response.data.message === 'Record successfully updated') {
        alert('Record updated successfully');
        setPopup(false);
        fetchDomains(); // Refresh data
      } else {
        alert('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div>
      <div className='card card-body '>

        <DomainForm onAddDomain={handleAddDomain} />
      </div>
      <div className='card card-body my-4' style={{ overflowX: "scroll" }}>


        <h1>Subscription Holders</h1>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search"
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {/* Table */}
        <table className="table table-striped" style={{  width: '100%' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.column.columnDef.cell ? cell.column.columnDef.cell(cell) : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination-controls" style={{ marginTop: '1rem' }}>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>
      </div>

      {Popup && (
        <EditPopUp
          currentRecord={CurrentRecord}
          onClose={() => setPopup(false)}
          onUpdate={handleUpdate}
        />)}
    </div>
  );
}
