
import { RotatingLines} from  'react-loader-spinner'



export default function LoadSpinnerTable(){


    return(
        
          
          <div className="Load-spinner-wrapper">
             <RotatingLines
              strokeColor=" #f7ff58"
              strokeWidth="3"
              animationDuration="0.75"
              width="26"
              visible={true}
              
            />

           
         </div>
        
         
    )
}

