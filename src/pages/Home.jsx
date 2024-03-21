import Hero from "../components/Hero";
import { useMediaQuery } from 'usehooks-ts'
import { lazy, Suspense } from "react";

const Scene = lazy(()=> import('../components/Scene') )

export function Home() {

    const mobile = useMediaQuery('max-width:768px')

    return(
        <>
            
            <section className="home-section">
                
                <Suspense fallback={null}>
                    <Scene/>
                    <Hero/>
                </Suspense>
            </section>
        </>
    )
}