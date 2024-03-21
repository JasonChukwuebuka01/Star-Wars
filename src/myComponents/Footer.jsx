

export default function Footer(){

        function getDate(){
            const date = new Date();
            return date.getFullYear();
        }
      

        
    return(
        <footer className="footer">
            <p className="footer-text">Star wars {getDate()}</p>
        </footer>
    )
}