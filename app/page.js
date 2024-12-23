'use client'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "./Components/Navbar";
import Domain from "./Components/Domain";

export default function Home() {

  const [Component, setComponent] = useState('Domain')

  return (
    <div>
      
      <Navbar />

      <div className="container mt-4">
      
        <div className="row">
      
          <Domain />
      
        </div>
      
      </div>

    </div>
  );
}
