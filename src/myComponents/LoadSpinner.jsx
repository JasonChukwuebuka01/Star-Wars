
import { RotatingLines} from  'react-loader-spinner'



export default function LoadSpinner(){


    return(
        
          
          <div className="Load-spinner-wrapper">
             <RotatingLines
              strokeColor=" #f7ff58"
              strokeWidth="9"
              animationDuration="0.75"
              width="46"
              visible={true}
              
            />

           <h2 className="loading-text">Loading Movies....</h2>
         </div>
        
         
    )
}

