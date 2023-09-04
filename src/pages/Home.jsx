import { Navbar } from "../components/Navbar";

export function Home() {


    return(
        <section className="home-section">
            <div className="home-container">
                <Navbar/>
                <div className="banner-texts-wrapper">
                    <div className="hi-texts">
                        <span>Hi, </span>
                        <span>I'm Hugo</span>
                    </div>
                    <div className="job-texts-wrapper">
                        I tranform ideas into captivating web experiences with code.
                    </div>
                    <div className="resume-download-btn-wrapper">
                        <button className="btn-primary">Check out my resume</button>
                    </div>
                </div>
            </div>
        </section>
    )
}