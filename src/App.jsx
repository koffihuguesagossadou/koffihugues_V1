import { lazy,createContext, useState, useContext, useRef, useEffect,Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom"
import gsap from "gsap";
import {HiOutlineArrowUpRight} from "react-icons/hi2"
import Preloader from "./components/Preloader";
import Transition from "./components/Transition";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lenis from '@studio-freight/lenis';


const Landing = lazy( ()=> import('./pages/Landing/Landing'))
const AboutP = lazy( ()=> import('./pages/About/AboutP') )
const WorkP = lazy(()=> import('./pages/Work/WorkP'))



export const PageTransitionContext = createContext();
export const CursorContext = createContext();

function LazyLoading() {
  return (
    <div className="lazy-loading"></div>
  )
}



// custom cursor function
function Cursor() {

  const cursorRef = useRef(null)
  const { cursorOnLink, setCursorOnLink } = useContext(CursorContext);

  useEffect(()=>{
      function updateMousePosition(eX, eY) {


        gsap.to(cursorRef.current,{
          x: eX,
          y: eY,
        })
        
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
  const [showTransition, setShowTransition] = useState(false)
  const routeLocation = useLocation()


  useEffect(()=>{

    if(routeLocation.pathname !== '/'){

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

  }, [routeLocation])

  return (
      <PageTransitionContext.Provider value={{showTransition, setShowTransition}}>
        <CursorContext.Provider value={{ cursorOnLink, setCursorOnLink}}>
            <div id='main-wrapper'>
              <Preloader/>
              <Transition/>
              <Navbar/>
              <main className="main-content">
                <Suspense fallback={null}>
                  <Routes>
                    <Route index element={<Landing/>}/>
                    <Route path="/about" element={<AboutP/>}/>
                    <Route path="/project/:projectName" element={<WorkP />} />
                  </Routes>
                </Suspense>
              </main>
              {routeLocation.pathname !== '/' && <Footer/>}
            </div>
          <Cursor/>
        </CursorContext.Provider>
      </PageTransitionContext.Provider>
  )
}



export default App
