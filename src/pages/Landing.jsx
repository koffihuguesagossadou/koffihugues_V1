import { BriefAbout } from "./About";
import { Contact } from "./Contact";
import { Home } from "./Home";
import { Works } from "./Works";

function Landing() {
    return (
        <main className="landing">
            <Home/>
            <BriefAbout/>
            <Works/>
            <Contact/>
        </main>
    )
}

export default Landing;