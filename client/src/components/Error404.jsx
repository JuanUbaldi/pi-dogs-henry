import React from 'react'
import { Link } from 'react-router-dom'


export default function Error404() {
  return (
    <div className='Container__Error404' >
        <h2 className='H2_404'>ERROR 404</h2>
    <Link to={"/home"}>
        <button className='Button__404'>Go Home</button>
    </Link>
    </div>
  )
}