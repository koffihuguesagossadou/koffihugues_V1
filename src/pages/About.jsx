import avatar from '../assets/avatar.png'

export function About() {
    return(
        <section className="about-section">
            <div className="about-container">
                <div className="introducing-wrapper">
                    <div className="section-title">
                        <h1>about</h1>
                    </div>
                    <div className="intro-text">
                        Hey again, My name is AGOSSADOU Koffi Hugues full stack developer with a proven track record of creating engaging and user-friendly websites.
                    </div>
                    <div className="my-picture">
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <div className="description-text">
                        <p>
                            Web development is not just my profession; it's my true passion. 
                            I find joy in crafting seamless user experiences and bringing ideas to life through elegant and efficient code. 
                            I'm constantly staying up-to-date with the latest industry trends and technologies, always seeking opportunities to enhance my skills and provide innovative solutions.
                        </p>
                    </div>
                </div>
                <div className="my-skills">
                    <div className="subtitle">
                        <h2>My skills</h2>
                        <div className="front-skills"></div>
                        <div className="back-skills"></div>
                        <div className="others-skills"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}