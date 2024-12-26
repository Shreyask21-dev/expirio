'use client'
import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import axios from 'axios';
import ClientForm from './Forms/ClientForm'
import EditPopUpClients from './EditPopUpClients';

export default function Client() {

  const [tableData, setTableData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');


  // Fetch data from the API
  const fetchDomains = async () => {
    try {
      const response = await axios.get('https://expirio.vercel.app/api/Clients');
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
           header: 'Sr. No',
         },

         {
           accessorKey: 'name',
           header: 'Name',
         },

         {
          accessorKey: 'company',
          header: 'Company',
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
           accessorKey: 'description',
           header: 'Description',
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
    const response = await axios.delete(`https://expirio.vercel.app/api/Clients?id=${id}`)
    if (response.data.message == "Record successfully deleted"){
      alert("Record successfully deleted")
      fetchDomains()
    }
    else{
      alert("Error while deleting record")

    }
  }

  // Function to handle adding a domain and updating the table data
  const handleAddClients = async (client) => {
    // Update the server with the new domain (same as your DomainForm logic)
    const response = await axios.post('https://expirio.vercel.app/api/Clients', client);

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
      const response = await axios.put(`https://expirio.vercel.app/api/Clients`, updatedRecord);
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
    <div style={{backgroundColor:"#ffffff"}}>
      <div className='card card-body '>
        {/* <DomainForm onAddDomain={handleAddDomain} /> */}
        <ClientForm onAdd={handleAddClients}/>
      </div>
      <div className='card card-body my-4 ' style={{overflowX:"scroll"}}>
        <h1>Current Clients</h1>
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
              <EditPopUpClients
                currentRecord={CurrentRecord}
                onClose={() => setPopup(false)}
                onUpdate={handleUpdate}
              />)}
    </div>
  )
}
