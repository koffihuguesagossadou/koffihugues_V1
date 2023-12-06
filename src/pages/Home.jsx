import { Scene } from "../components/Scene";
import Hero from "../components/Hero";

export function Home() {

    return(
        <>
            
            <section className="home-section">
                <Scene/>
                <Hero/>
            </section>
        </>
    )
}