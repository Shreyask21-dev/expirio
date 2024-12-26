'use client'
import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Navbar() {

  const router = useRouter()

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js')
  }, [])

  return (
    <div>
      <style>
        {`
          .pcView {
            display: block;
          }

          .mobileView {
            display: none !important;
          }

          @media only screen and (max-width: 600px) {
            .pcView {
              display: none !important;
            }

            .mobileView {
            display: block !important;
          }
          }
        `}
      </style>

      {/* pc view */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary pcView">
        <div className="container">
          <div>
            <Link className="navbar-brand" href="/">
              <img src='/images/logo.png' style={{ width: "20%" }} />
            </Link>
          </div>
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/Clients">Clients</Link>
                </li>
                <li className='nav-item'>
                  <button className="btn btn-outline-dark" onClick={() => { localStorage.setItem('userName', ''); router.push('/Login/') }}>logout</button>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/Subscription">Subscription</Link>
                </li>  */}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* phone view */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary mobileView">
        <div className="container">
          <div className='d-flex justify-content-between'>

            <div>
              <Link className="navbar-brand" href="/">
                <img src='/images/logo.png' style={{ width: "30%" }} />
              </Link>
            </div>

            <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            </div>

          </div>
          <div>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/Clients">Clients</Link>
                </li>
                <li className='nav-item'>
                  <button className="btn btn-outline-dark" onClick={() => { localStorage.setItem('userName', ''); router.push('/Login/') }}>logout</button>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link " aria-current="page" href="/Subscription">Subscription</Link>
                </li>  */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
