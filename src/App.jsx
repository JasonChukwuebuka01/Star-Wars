
import {createBrowserRouter,createRoutesFromElements, RouterProvider,Route} from "react-router-dom";
import Home,{loader as homeLoader} from "./myComponents/Home";
import MovieDetail, {loader as movieDetailLoader} from "./myComponents/MovieDetail";
import PageNotFound from "./myComponents/PageNotFound";
import Error from "./myComponents/Error";




const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/">
        <Route
         index
         element={<Home/>}
         loader={homeLoader}
         errorElement = {<Error/>}
       />
       
       <Route
         path=":id"
         element={<MovieDetail/>}
         loader={movieDetailLoader}
         errorElement = {<Error/>}
       />
       
       <Route path="*" element={<PageNotFound/>} />
      </Route> 
  
))


export default function App() {
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

 
