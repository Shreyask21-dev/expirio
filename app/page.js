'use client'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "./Components/Navbar";
import Domain from "./Components/Domain";
import Hosting from "./Components/Hosting";
import AMC from "./Components/AMC";
import BusinessEmail from "./Components/BusinessEmail";

export default function Home() {

  const [Component, setComponent] = useState('Domain')

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="mb-2">
              <button type="button" class="btn btn-light" style={{width:"100%", textAlign:"left"}} onClick={()=>{setComponent('Domain')}}>Domain</button>
            </div>
            <div className="mb-2">
              <button type="button" class="btn btn-light" style={{width:"100%", textAlign:"left"}} onClick={()=>{setComponent('Hosting')}}>Hosting SSL</button>
            </div>
            <div className="mb-2">
              <button type="button" class="btn btn-light" style={{width:"100%", textAlign:"left"}} onClick={()=>{setComponent('AMC')}}>AMC</button>
            </div>
            <div className="mb-2">
              <button type="button" class="btn btn-light" style={{width:"100%", textAlign:"left"}} onClick={()=>{setComponent('BEmail')}}>Business Email</button>
            </div>
          </div>
          <div className="col-md-9 mt-4">
            {Component == "Domain" && <Domain /> }
            {Component == "Hosting" && <Hosting /> }
            {Component == "AMC" && <AMC /> }
            {Component == "BEmail" && <BusinessEmail /> }
  
            
          </div>

        </div>
      </div>

    </div>
  );
}
