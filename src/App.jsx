import { lazy,createContext, useState, useContext, useRef, useEffect,Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom"
import Lenis from '@studio-freight/lenis';
import gsap from "gsap";
import {HiOutlineArrowUpRight} from "react-icons/hi2"
import { Navbar } from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";
import Transition from "./components/Transition";
import { Footer } from "./components/Footer";

const Landing = lazy( ()=> import('./pages/Landing/Landing'))
const AboutP = lazy( ()=> import('./pages/About/AboutP') )


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


  useEffect(()=>{

  
  

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

    

    
  }, [])


  return (
      <PageTransitionContext.Provider value={{showTransition, setShowTransition}}>
        <CursorContext.Provider value={{ cursorOnLink, setCursorOnLink}}>
            <div id='main-wrapper'>

              <Preloader/>
              <Transition/>
              <header>
                <Navbar/>
              </header>
              <main className="main-content">
                <Suspense fallback={null}>
                  <Routes>
                    <Route index element={<Landing/>}/>
                    <Route path="/about" element={<AboutP/>}/>
                  </Routes>
                </Suspense>
              </main>
              <Footer/>
            </div>
          <Cursor/>
        </CursorContext.Provider>
      </PageTransitionContext.Provider>
  )
}



export default App
