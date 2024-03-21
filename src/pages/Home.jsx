import Hero from "../components/Hero";
import { useMediaQuery } from 'usehooks-ts'
import { lazy, Suspense } from "react";
import { HomeMobile } from "../components/HomeMobile";
import Footer from "../components/Footer";

const Scene = lazy(()=> import('../components/Scene') )

export function Home() {

    const mobile = useMediaQuery('(max-width: 768px)')



    return(
        <>
            
            <section className="home-section">
                {
                    
                    <Suspense fallback={null}>
                        {
                            mobile ?
                            <>
                                <HomeMobile/>
                                <Footer/>
                            </>
                            :
                            <>
                                <Scene/>
                                <Hero/>
                            </>
                            
                        }

                        
                    </Suspense>
                }
                
            </section>
        </>
    )
}