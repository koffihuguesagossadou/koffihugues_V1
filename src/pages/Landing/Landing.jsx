import { Home } from "../Home";
import useDocumentTitle from "../../Hook/useDocumentTitle";

function Landing() {

    useDocumentTitle('Koffi Hugues | Home') 

    return (
        <main className="landing">
            <Home/>
            {/* <BriefAbout/>
            <Works/>
            <Contact/> */}
        </main>
    )
}

export default Landing;