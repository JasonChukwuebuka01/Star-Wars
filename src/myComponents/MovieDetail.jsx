import { useLoaderData, useSearchParams, useNavigate} from "react-router-dom"
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { MdToggleOff,MdToggleOn } from "react-icons/md";
import { getData } from "../../api";
import { loadImageData } from "../../api";
import Footer from "./Footer";
import LoadSpinnerTable from "./LoadSpinnerTable";
import { useEffect, useState } from "react";



export function loader({params}){
    return getData(params.id)
}


export default function MovieDetail(){

    const [movieCharacters ,  setMoviesCharacters]= useState([]);

    const [movieImage, setMovieImage] = useState(null);

    const [isClickedOnce, setIsClickedOnce] = useState(null);

    const [toggle, setToggle] = useState(false);

    const movieData = useLoaderData();

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const filter = searchParams.get("type");


  
    
   
   
/*
 setMoviesCharacters() is called after 9secs when useEffect functions get called.
    This is the only way all datas got from fetch and pushed into newMoviesArr[]
   are super ready to be set in setMoviesCharacter to get these full data and re-render the component.
   IF OTHERWISE, it keeps encoutering a bug hereby loading incomplete data or none.

*/
   useEffect(()=>{
            const movieArr = movieData.characters;

            loadData();
            const newMoviesArr=[];


            function loadData(){

               movieArr.forEach(movie=>{
                  fetch(movie)
                  .then(res=>res.json())
                  .then(data=> {
                    newMoviesArr.push(data)
                })
                .catch(err=>console.log(err))

              });
            }

           
        setTimeout(() => {
            setMoviesCharacters(newMoviesArr);

        },9000);
       
    },[]);




    useEffect(()=>{
    
          loadImageData(movieData.title)
          .then(data=> setMovieImage(data))
        
    },[]);



   useEffect(()=>{
          
      if(isClickedOnce){
          sortTableAscending();
      }else{
         sortTableDescending();
      };

   },[isClickedOnce]);



   function filterGender(key,value){
          
      setSearchParams(prevParams=>{

         if(value === null){
             prevParams.delete(key);
         }else{
             prevParams.set(key,value);
         };
         return prevParams;

      });
       
   };


   const movieFilter = filter? movieCharacters.filter(movies=> movies.gender === filter) : movieCharacters;

   const movieTableData =movieFilter.map((character,index)=>(
               <tr key={index+1}  className={`${toggle? "light" : "dark"}`}>
                    <td>{index + 1}</td>
                    <td>{character.name}</td>
                    <td>{genderIconChecker(character.gender)}</td>
                    <td>{`${character.height} cm`}</td>
               </tr>
 ));




   function sumOfCharacterHeights(){
        let centimeterSum= 0;
           
        movieFilter.forEach(character=>{
          centimeterSum += Number(character.height);  
        });

         const foot =Math.round((centimeterSum / 30.48));
         const inches = Math.round((centimeterSum / 2.54));

          return `${centimeterSum} cm (${foot}ft / ${inches}in)`;
   };

     





    function genderIconChecker(gender){
      return gender === "male"? "m" : gender ==="female"? "f" : "h"
    };





      function totalCharactersAvailable(){
         let sumCharacter = 0;
         movieFilter.forEach(()=> sumCharacter++)
   
         return sumCharacter;
     };
 

 
      function sortTableAscending(){
          setMoviesCharacters(prev=> prev.sort((a,b)=> b.height - a.height))
      };




     function sortTableDescending(){ 
         setMoviesCharacters(prev=> prev.sort((a,b)=> a.height - b.height))
      };




       function TableHeaderClicked(clicked){
              if(clicked){
               setIsClickedOnce(true);
              }else{
               setIsClickedOnce(false);
              };
       };
   



       function toggleTheme(){
         setToggle(prev=>!prev);
       };

         


       function navigateToHome(){
           navigate(`/`)
       };


  const ImageSrc = movieImage || "https://i.pinimg.com/originals/c7/9c/66/c79c6663fb7c31f1d6dc117e8df2c0b7.jpg";



return(
      <section className={`MovieDetail-wrapper ${toggle ? "light" : "dark"}`}>
         <header className="movie-header">
            <h1 className="movie-title">{movieData.title}</h1>

            {toggle?  

              <MdToggleOff 
                className="toggle-icon off"
                onClick={()=>toggleTheme()}
                /> 

                : 

                <MdToggleOn 
                  className="toggle-icon on"
                  onClick={()=>toggleTheme()}
                />
            }

            <button
              className={`back-btn ${toggle? "light" : "dark"}`}
            >
               &larr; <span  onClick={()=>navigateToHome()}>Back to Home</span>
            </button>
         </header>
        
         <img src={ImageSrc} alt=""  className="movie-picture" />

         <article className="movie-frame">
            <marquee 
              className={`crawl-text ${toggle? "light" : "dark"}`}
              >
               {movieData.opening_crawl}
              </marquee>

             {
               movieCharacters.length !== 0? 

             <section className="movie-nav-table-box">

                <nav className="filter-nav">
                   <button className={`gender-btn  ${filter === "male"? "filter": "" } ${toggle? "light" : "dark"}`}
                     onClick={()=>filterGender("type","male")}
                  >
                     <FaMale /> 
                  </button>

                  <button className={`gender-btn  ${filter === "female"? "filter": ""  } ${toggle? "light" : "dark"}`} 
                   onClick={()=>filterGender("type","female")}
                   >
                     <FaFemale /> 
                  </button>
                
                  {filter &&
                   <button 
                     className={`clear-btn  ${toggle? "light" : ""}`}
                     onClick={()=>filterGender("type",null)}
                     
                    >clear
                    </button>} 

               </nav>

               <table 
                width={"80%"}
               >
                 <thead 
                  onClick={()=>TableHeaderClicked(true)}
                  onDoubleClick={()=>TableHeaderClicked(false)}
                  >

                   <tr>
                     <th className={`${toggle? "light" : ""}`}>s/n</th>
                     <th className={`${toggle? "light" : ""}`}>Name</th>
                     <th className={`${toggle? "light" : ""}`}>Gender</th>
                     <th className={`${toggle? "light" : ""}`}>Height</th>
                   </tr>
                 </thead>
                 <tbody>
                    {movieTableData}
                 </tbody>
                 <tfoot>
                    <tr>
                     <td></td>
                     <td></td>
                     <td colSpan="1">Total no of characters found</td>
                     <td>{totalCharactersAvailable()}</td>
                    </tr>
                    <tr>
                     <td></td>
                     <td></td>
                     <td colSpan="1">Sum of heights</td>
                     <td>{sumOfCharacterHeights()}</td>
                    </tr>
                 </tfoot>
            
                 </table>
                 <Footer/>
               </section>  
             :
            <LoadSpinnerTable/>
             }
         </article>
      </section>
)
}

