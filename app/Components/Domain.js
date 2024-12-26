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
  const [clientData, setClientData] = useState([]);

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

  const getClientData = async () => {
    try {
      const responseClients = await axios.get('https://expirio.vercel.app/api/Clients');
      setClientData(responseClients.data); // Update client data state
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  useEffect(() => {
    fetchDomains();
    getClientData()
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
        // cell: ({ getValue }) => <div style={{ whiteSpace: 'nowrap' }}>{getValue()}</div>,
       
        // red logic only
        // cell: ({ getValue }) => {
        //   const parseDate = (dateString) => {
        //     const [day, month, year] = dateString.split('-'); // Split by "-"
        //     return new Date(`${year}-${month}-${day}`); // Rearrange to "YYYY-MM-DD"
        //   };
        
        //   const today = new Date();
        //   today.setHours(0, 0, 0, 0); // Reset time to midnight
        
        //   const eDate = parseDate(getValue());
        //   const oneMonthLater = new Date(today);
        //   oneMonthLater.setMonth(today.getMonth() + 1);
        
        //   const isWithinOneMonth = eDate >= today && eDate <= oneMonthLater;
        
        //   console.log(`eDate: ${getValue()}, Parsed eDate: ${eDate}, isWithinOneMonth: ${isWithinOneMonth}`);
        
        //   return (
        //     <div
        //       style={{
        //         whiteSpace: 'nowrap',
        //         backgroundColor: isWithinOneMonth ? 'red' : 'transparent',
        //         color: isWithinOneMonth ? 'white' : 'black',
        //         padding: '5px',
        //         borderRadius: '4px',
        //       }}
        //     >
        //       {getValue()}
        //     </div>
        //   );
        // },

        // red and yello
        // cell: ({ getValue }) => {
        //   const parseDate = (dateString) => {
        //     const [day, month, year] = dateString.split('-'); // Split by "-"
        //     return new Date(`${year}-${month}-${day}`); // Rearrange to "YYYY-MM-DD"
        //   };
        
        //   const today = new Date();
        //   today.setHours(0, 0, 0, 0); // Reset time to midnight
        
        //   const eDate = parseDate(getValue());
        
        //   const oneMonthLater = new Date(today);
        //   oneMonthLater.setMonth(today.getMonth() + 1);
        
        //   const twoMonthsLater = new Date(today);
        //   twoMonthsLater.setMonth(today.getMonth() + 2);
        
        //   let backgroundColor = 'transparent';
        //   if (eDate >= today && eDate <= oneMonthLater) {
        //     backgroundColor = 'red';
        //   } else if (eDate > oneMonthLater && eDate <= twoMonthsLater) {
        //     backgroundColor = 'yellow';
        //   }
        
        //   console.log(
        //     `eDate: ${getValue()}, Parsed eDate: ${eDate}, Background: ${backgroundColor}`
        //   );
        
        //   return (
        //     <div
        //       style={{
        //         whiteSpace: 'nowrap',
        //         backgroundColor: backgroundColor,
        //         color: backgroundColor !== 'transparent' ? 'black' : 'inherit',
        //         padding: '5px',
        //         borderRadius: '4px',
        //       }}
        //     >
        //       {getValue()}
        //     </div>
        //   );
        // },
        
        //red and yello with message
        // cell: ({ getValue }) => {
        //   const parseDate = (dateString) => {
        //     const [day, month, year] = dateString.split('-'); // Split by "-"
        //     return new Date(`${year}-${month}-${day}`); // Rearrange to "YYYY-MM-DD"
        //   };
        
        //   const today = new Date();
        //   today.setHours(0, 0, 0, 0); // Reset time to midnight
        
        //   const eDate = parseDate(getValue());
        
        //   const oneMonthLater = new Date(today);
        //   oneMonthLater.setMonth(today.getMonth() + 1);
        
        //   const twoMonthsLater = new Date(today);
        //   twoMonthsLater.setMonth(today.getMonth() + 2);
        
        //   let backgroundColor = 'transparent';
        //   let message = '';
        
        //   if (eDate >= today && eDate <= oneMonthLater) {
        //     backgroundColor = 'red';
        //     message = 'Please renew as soon as possible!';
        //   } else if (eDate > oneMonthLater && eDate <= twoMonthsLater) {
        //     backgroundColor = 'yellow';
        //     message = 'Renewal due soon, kindly plan ahead.';
        //   }
        
        //   console.log(
        //     `eDate: ${getValue()}, Parsed eDate: ${eDate}, Background: ${backgroundColor}, Message: ${message}`
        //   );
        
        //   return (
        //     <div
        //       style={{
        //         whiteSpace: 'nowrap',
        //         backgroundColor: backgroundColor,
        //         color: backgroundColor !== 'transparent' ? 'black' : 'inherit',
        //         padding: '5px',
        //         borderRadius: '4px',
        //       }}
        //     >
        //       {getValue()}
        //       {message && (
        //         <div style={{ fontSize: '0.8em', marginTop: '5px', color: 'black' }}>
        //           {message}
        //         </div>
        //       )}
        //     </div>
        //   );
        // },

        cell: ({ getValue }) => {
          const parseDate = (dateString) => {
            const [day, month, year] = dateString.split('-'); // Split by "-"
            return new Date(`${year}-${month}-${day}`); // Rearrange to "YYYY-MM-DD"
          };
        
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset time to midnight
        
          const eDate = parseDate(getValue());
        
          const oneMonthLater = new Date(today);
          oneMonthLater.setMonth(today.getMonth() + 1);
        
          const twoMonthsLater = new Date(today);
          twoMonthsLater.setMonth(today.getMonth() + 2);
        
          let backgroundColor = 'transparent';
          let textColor = 'black';
          let message = '';
        
          if (eDate >= today && eDate <= oneMonthLater) {
            backgroundColor = 'red';
            textColor = 'white';
            message = 'Please renew as soon as possible!';
          } else if (eDate > oneMonthLater && eDate <= twoMonthsLater) {
            backgroundColor = 'yellow';
            textColor = 'black';
            message = 'Renewal due soon, kindly plan ahead.';
          }
        
          console.log(
            `eDate: ${getValue()}, Parsed eDate: ${eDate}, Background: ${backgroundColor}, TextColor: ${textColor}, Message: ${message}`
          );
        
          return (
            <div
              style={{
                whiteSpace: 'nowrap',
                backgroundColor: backgroundColor,
                color: textColor,
                padding: '5px',
                borderRadius: '4px',
              }}
            >
              {getValue()}
              {message && (
                <div style={{ fontSize: '0.8em', marginTop: '5px', color: textColor }}>
                  {message}
                </div>
              )}
            </div>
          );
        },
        
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
    <div style={{backgroundColor:"#ffffff"}}>
      <div className='card card-body '>

        <DomainForm onAddDomain={handleAddDomain} tableData={clientData} />
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
          <button  className='btn btn-outline-dark' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <button className='btn btn-outline-dark mx-3' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
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
