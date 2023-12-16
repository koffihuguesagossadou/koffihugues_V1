import Hero from "../components/Hero";
import { lazy, Suspense } from "react";

const Scene = lazy(()=> import('../components/Scene') )

export function Home() {

    return(
        <>
            
            <section className="home-section">
                <Suspense fallback={null}>
                    <Scene/>
                </Suspense>
                <Hero/>
            </section>
        </>
    )
}