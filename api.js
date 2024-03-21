
export async function getData(id){
    const url = id? `https://swapi.dev/api/films/${id}`: "https://swapi.dev/api/films"

    const response = await fetch(url);

    const data = await response.json();

    if(!response.ok){

        throw {
            message: data.message,
            errorCode: response.error
        }
    };

    return data;

};



export async function loadImageData(movieName){
    
    const url = `https://api.unsplash.com/photos/random?query=${movieName}-starwars&client_id=ul4WyV0va4-vxv2dATR3csnvFwZgIO_iV5L51qy7J38`

    const res = await fetch(url);
      
    const data = await res.json();

       if(!res.ok){
        throw{
            message: data.message,
            errorCode: res.status
        }
       };
   
      return data.urls.raw;
}