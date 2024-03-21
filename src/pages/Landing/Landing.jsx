import { Home } from "../Home";
import useDocumentTitle from "../../Hook/useDocumentTitle";

function Landing() {

    useDocumentTitle('Koffi Hugues | Full stack & creative developer') 

    return (
            <Home/>
            
    )
}

export default Landing;