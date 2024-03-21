import { Link } from "react-router-dom";


export default function PageNotFound(){

    return(
         
        <section className="page-not-found">
            <h1>Sorry, the page you were looking for was not found.</h1>
             <Link 
               to={"/"}
               className="page-not-found-btn"
               >Return to home</Link>
        </section>
    )
}