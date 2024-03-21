import {  Await, defer, useLoaderData, useNavigate} from "react-router-dom";
import { getData } from "../../api"
import LoadSpinner from "./LoadSpinner";
import { Suspense} from "react";




export function loader(){
    return defer({data : getData()});
}


export default function Home(){

     const navigate = useNavigate();
     const allMoviesData= useLoaderData();

     

      function chooseMovie(e){
          const {value} = e.target;
          navigate(`${value}`);
      };



    return(
        <section className={`home-wrapper`}>
          <Suspense fallback={<LoadSpinner/>}>
             <Await resolve={allMoviesData.data}>
                 {allMovies=>{
                   
             const optionElements = allMovies.results.map((movie,index)=> (
                                     <option key={movie.episode_id} value={index+1}>{movie.title}</option>
                                     ));
            
                   return(
                       <>
                          <img src ={"/images/transparentLogo.png"}  className="image-container"/>

                          <select className="select" onChange={chooseMovie}>
                              <option>Choose a Star Wars Movie</option>
                                   {optionElements}
                          </select>
                       </>
                   )
                 }}
              </Await>
          </Suspense>    
        </section>
    )
}
