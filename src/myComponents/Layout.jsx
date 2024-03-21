
import { Outlet, useSearchParams } from "react-router-dom"
import Footer from "./Footer"
import { useEffect, useState } from "react"



export default function Layout(){


    return(
        <section className={`site-wrapper`}>
         <main>
           <Outlet />
         </main>
         

       </section>
       
    )
}