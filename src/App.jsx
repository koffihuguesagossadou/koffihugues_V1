import { lazy,createContext, useState, useContext, useRef, useEffect,Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom"
import gsap from "gsap";
import {HiOutlineArrowUpRight} from "react-icons/hi2"
import Preloader from "./components/Preloader";
import Transition from "./components/Transition";
import { useLocation, matchRoutes } from "react-router-dom";
import Lenis from '@studio-freight/lenis';
import {routes} from './data/routes'
import { useMediaQuery } from "usehooks-ts";

const Navbar = lazy( ()=> import('./components/Navbar'))
const Footer = lazy( ()=> import('./components/Footer'))
const Landing = lazy( ()=> import('./pages/Landing/Landing'))
const AboutP = lazy( ()=> import('./pages/About/AboutP') )
const WorkP = lazy(()=> import('./pages/Work/WorkP'))
const ArchiveP = lazy(()=> import('./pages/Archive/ArchiveP'))
const ErrorP = lazy(()=> import ('./pages/Error/ErrorP') )




export const PageTransitionContext = createContext();
export const CursorContext = createContext();
export const PreloaderContext = createContext();



// custom cursor function
function Cursor() {

  const cursorRef = useRef(null)
  const { cursorOnLink, setCursorOnLink } = useContext(CursorContext);

  useEffect(()=>{
      function updateMousePosition(eX, eY) {
        if(cursorRef.current)
        {
          gsap.to(cursorRef.current,{
            x: eX,
            y: eY,
          })

        }

        
      }

      window.addEventListener("mousemove", e => {
        updateMousePosition(e.clientX, e.clientY);
    });


    // Clean up the event listener on unmount
    return ()=>{
      window.removeEventListener("mousemove", e => {
        updateMousePosition(e.clientX, e.clientY);
    })
    }

  }, [])


  return(

      <div ref={ cursorRef } data-text='View' className={`cursor cursor-active ${cursorOnLink === "work"
        ? 'cursor-active-link' 
        : cursorOnLink === "email" ? 'cursor-email-link'
        : ''} `}>
        <HiOutlineArrowUpRight/>
      </div>
  )
}


function App() {

  const [cursorOnLink, setCursorOnLink] = useState(null)
  const [showTransition, setShowTransition] = useState(null)
  const [preloaderPerformed, setPreloaderPerformed] = useState(false)
  const [getRoutes, setRoutes] = useState({})
  const routeLocation = useLocation()
  const mobile = useMediaQuery('(max-width:768px)')
  

  
  const match = useMemo(()=>{


    if(Object.values(getRoutes).length === 0)
    {

        setRoutes({...routes})
      
    }

    const routesArray = Object.values(getRoutes)
    
    return matchRoutes(routesArray, routeLocation)
  }, [getRoutes])

  
  useEffect(()=>{

     if(import.meta.env.DEV) console.log(match)

    if(routeLocation.pathname !== '/' && !mobile){

        const lenis = new Lenis({
        duration: 3,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });
    
      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      
      requestAnimationFrame(raf);
    }
    

  }, [routeLocation, mobile])

  return (
      <PreloaderContext.Provider value={{ preloaderPerformed, setPreloaderPerformed }}>
        <PageTransitionContext.Provider value={{showTransition, setShowTransition}}>
          <CursorContext.Provider value={{ cursorOnLink, setCursorOnLink}}>
              <div id='main-wrapper'>
                { match !== null && <Suspense fallback={null}><Preloader/></Suspense>}
                { match !== null &&  <Suspense fallback={null}><Transition/></Suspense>}
                { match !== null && <Suspense fallback={null}><Navbar/></Suspense>}
                <main className="main-content">
                  
                  <Suspense fallback={null}>
                    <Routes>
                      <Route index path="/" element={<Landing/>}/>
                      <Route path="/about" element={<AboutP/>}/>
                      <Route path="/archives" element={ <ArchiveP /> } />
                      { match !== null  &&                     
                        <Route 
                          errorElement= {<ErrorP/>}
                          path="/project/:projectName" element={<WorkP />} />
                      }
                      
                      <Route path="*" element={<ErrorP />} />
                      
                    </Routes>
                  </Suspense>
                </main>
                { match !== null &&  (routeLocation.pathname === '/about' || routeLocation.pathname === '/archives') && <Suspense fallback={null}><Footer/></Suspense>}
              </div>
            <Cursor/>
          </CursorContext.Provider>
        </PageTransitionContext.Provider>
      </PreloaderContext.Provider>
  )
}



export default App
