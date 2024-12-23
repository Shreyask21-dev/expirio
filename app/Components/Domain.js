'use client'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import DataTable from 'datatables.net-dt';
import DomainForm from './Forms/DomainForm';
import axios from 'axios';
import EditPopUp from './EditPopUp';

import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Domain() {

  const [TableData, setTableData] = useState([])


  const getDomains = async () => {
    const response = await axios.get('http://localhost:3000/api/Domains')

    const data = response.data

    // const arrayResposne = data.map(obj => Object.values(obj))

    // setTableData(arrayResposne)

    // console.log(arrayResposne)

    // Sort the data by expiry date in descending order (latest expiry first)

    const sortedData = data
      .map(obj => Object.values(obj)) // Convert objects to arrays
      .sort((a, b) => {
        const expiryA = new Date(a[6]); // Assuming expiry date is at index 6
        const expiryB = new Date(b[6]);
        return expiryB - expiryA; // Descending order (latest expiry first)
      });

    setTableData(sortedData);
    console.log(sortedData); // Check the sorted data
  }

  const initializeDataTable = () => {
    // Check if DataTable is already initialized and destroy it
    if ($.fn.dataTable.isDataTable('#myTable')) {
      const table = $('#myTable').DataTable();
      table.destroy(); // Destroy the existing instance
    }

    // Initialize DataTable
    const table = new DataTable('#myTable', {
      // data: [
      //   ['01', 'Shreyas', '8530136842', 'devshreyas21@gmail.com', 'shreyas.com', 'start date', 'end date'],
      //   ['02', 'Shruti', '9762735825', 'shruti@gmail.com', 'shruti.com', 'start date', 'end date']
      // ],
      data : TableData,
      columns: [
        { title: 'sr.no' },
        { title: 'name' },
        { title: 'phone no.' },
        { title: 'email' },
        { title: 'service' },
        { title: 'description' },
        { title: 'Launch Date' },
        { title: 'expiry' },
      ],
      drawCallback: function () {
        addCustomClassToPagingButtons(); // Reapply custom classes after each draw
      }
    })
  }

  const addCustomClassToPagingButtons = () => {

    const buttons = document.querySelectorAll('.dt-paging-button');
    buttons.forEach((button) => {
      button.classList.add('btn', 'btn-outline-primary', 'mx-1'); // Add your custom class
    });


    const dataTableRowLayout = document.querySelectorAll('.dt-layout-row');

    // Apply styles to the first div
    if (dataTableRowLayout[0]) {
      dataTableRowLayout[0].classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-4');
    }

    // Apply styles to the third div
    if (dataTableRowLayout[2]) {
      dataTableRowLayout[2].classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-4');
    }



    const element1 = document.getElementById('dt-length-1')
    if (element1) {
      element1.classList.add('me-3')
    }

    const label = document.querySelector('label[for="dt-search-1"]'); // Select the label by its 'for' attribute
    if (label) { // Check if the label exists
      label.classList.add('me-3', 'd-inline'); // Add your custom classes
    }


    const searchInput = document.getElementById('dt-search-1');
    if (searchInput) {
      searchInput.classList.add('form-control', 'd-inline', 'rounded', 'shadow-sm'); // Add custom classes
    }

  };


  const [Popup, setPopup] = useState(false)
  const [CurrentRecord, setCurrentRecord] = useState([]);

  const editRecord = async (id) => {
    const record = TableData.find((entry)=>entry[0]== id)
    setCurrentRecord({
      id: record[0],
      name: record[1],
      phone: record[2],
      email: record[3],
      service:record[4],
      description:record[5],
      sDate:record[6],
      eDate:record[7]
      // Map other fields as necessary
    });
    setPopup(true)
  }

  const handleUpdate = async (updatedRecord) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/Domains`, updatedRecord);
      if (response.data.message === 'Record successfully updated') {
        alert('Record updated successfully');
        setPopup(false);
        getDomains(); // Refresh data
      } else {
        alert('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };


  const deleteRecord = async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/Domains?id=${id}`)
    if (response.data.message == "Record successfully deleted"){
      alert("Record successfully deleted")
      getDomains()
    }
    else{
      alert("Error while deleting record")

    }
  }
  

  useEffect(() => {
    // const initializeDataTable = () => {
    //   if ($.fn.dataTable.isDataTable('#myTable')) {
    //     const table = $('#myTable').DataTable();
    //     table.destroy(); // Destroy the existing instance
    //   }
  
    //   new DataTable('#myTable', {
    //     data: TableData,
    //     columns: [
    //       { title: 'Sr.no' },
    //       { title: 'Name' },
    //       { title: 'Phone no.' },
    //       { title: 'Email' },
    //       { title: 'Service' },
    //       { title: 'Description' },
    //       { title: 'Launch ' },
    //       { title: 'Expiry ' },
    //       { title: 'Actions ' },
    //     ],
    //     drawCallback: function () {
    //       addCustomClassToPagingButtons();
    //     },
    //   });
    // };

    const initializeDataTable = () => {
      if ($.fn.dataTable.isDataTable('#myTable')) {
        const table = $('#myTable').DataTable();
        table.destroy(); // Destroy the existing instance
      }
    
      new DataTable('#myTable', {
        data: TableData,
        columns: [
          { title: 'Sr.no' },
          { title: 'Name' },
          { title: 'Phone no.' },
          { title: 'Email' },
          { title: 'Service' },
          { title: 'Description' },
          { title: 'Launch ' },
          { title: 'Expiry ' },
          {
            title: 'Actions',
            render: function (data, type, row, meta) {
              return `
                <button class="btn-edit btn btn-primary mb-2" data-id="${row[0]}">Edit</button>
                <button class="btn-delete btn btn-danger mb-2" data-id="${row[0]}">Delete</button>
              `;
            },
          },
        ],
        drawCallback: function () {
          addCustomClassToPagingButtons();
    
          // Attach click event listeners to buttons
          document.querySelectorAll('.btn-edit').forEach((button) => {
            button.addEventListener('click', (e) => {
              console.log('Edit ID:', e.target.dataset.id);
              editRecord(e.target.dataset.id)
            });
          });
    
          document.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', (e) => {
              console.log('Delete ID:', e.target.dataset.id);
              deleteRecord(e.target.dataset.id)
            });
          });
        },
      });
    };
    
  
    if (TableData.length > 0) {
      initializeDataTable();
    }
  }, [TableData]); // Reinitialize the table whenever TableData changes
  
  useEffect(() => {
    getDomains(); // Fetch data
  }, []);
  

// Function to handle adding a domain and updating the table data
const handleAddDomain = async (newDomain) => {
  // Update the server with the new domain (same as your DomainForm logic)
  const response = await axios.post('http://localhost:3000/api/Domains', newDomain);

  if (response.data.message === 'Domain successfully added') {
    alert('Record added successfully');
    // Fetch updated data and set state
    getDomains(); // Re-fetch and update TableData
  } else {
    alert('Record failed to add');
  }
};


  return (
    <div>
      <div className='card card-body '> 
        <DomainForm onAddDomain={handleAddDomain} />
      </div>
      <div className='card card-body my-4' style={{overflowX:"scroll"}}>
        <h1>Subscription Holders </h1>
        <table id='myTable' className="display table table-striped" style={{ width: '100%' }}></table>
      </div>

      {Popup && (
        <EditPopUp
          currentRecord={CurrentRecord}
          onClose={() => setPopup(false)}
          onUpdate={handleUpdate}
        />)}
    </div>
  )
}
