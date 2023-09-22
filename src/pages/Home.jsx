import { Navbar } from "../components/Navbar";

export function Home() {


    return(
        <>
            <Navbar/>
            <section className="home-section">
                <div className="home-container container">
                    <div className="banner-texts-wrapper">
                        <div className="hi-texts">
                            <span>Hi, </span>
                            <span>I'm Hugo</span>
                        </div>
                        <div className="job-texts-wrapper">
                            I tranform ideas into captivating web experiences with code.
                        </div>
                        {/* <div className="resume-download-btn-wrapper">
                            <a href="" className="btn-primary">Check out my resume</a>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}