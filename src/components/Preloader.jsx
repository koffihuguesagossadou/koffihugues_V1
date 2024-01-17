import React, {useContext, useEffect, useRef} from 'react'
import gsap from "gsap";
import { PreloaderContext } from '../App';


export default function Preloader({display}) {

    const bottomItemRef = useRef()
    const bandsRefs = useRef([])
    const preloaderRef = useRef()
    const loaderTextWrapperRef = useRef()
    const { preloaderPerformed, setPreloaderPerformed } = useContext(PreloaderContext)



    useEffect(()=>{



            if (bandsRefs.current) {
                gsap.to(bandsRefs.current,{
                    x: "-100%",
                    delay: 2.6,
                    onComplete: ()=>{
                        setPreloaderPerformed(true)
                    },
                    stagger:{
                        amount: .5
                    }
                })
            }
    
            if (bottomItemRef.current) {
                gsap.to(bottomItemRef.current, {
                    opacity: 0,
                    delay: 2.4
                })
            }
    
            if (preloaderRef.current) {
                gsap.to(preloaderRef.current, {
                    x: '-100%',
                    delay: 3.4
                })
            }


            if (loaderTextWrapperRef.current) {
                gsap.to(loaderTextWrapperRef.current, {
                    opacity: 0,
                    delay: 2.4
                })
            }



    }, [])

    return (
        <div className='preloader-wrapper' ref={preloaderRef}>
            {
                Array.from({ length: 8 }).map((_, i)=>{
                    return <div 
                        ref={ el => bandsRefs.current[i] = el }
                        key={i} className="band"
                    ></div>
                })
            }
            <div ref={loaderTextWrapperRef} className="loader-content-texts">
                <span className='text-item'>
                    Agossadou <i>Koffi Hugues</i>
                </span>
                <span className='text-item'>
                    <i>Full stack</i> developer
                </span>
                <span className='text-item'>
                    Creative <i>developer</i>
                </span>
                <span className='text-item'>
                    <i>Agossadou</i> Koffi Hugues
                </span>
                <span className='text-item'>
                    Full stack <i>developer</i>
                </span>
                <span className='text-item'>
                <i> Creative</i> developer
                </span>
            </div>

            <div className="bottom-item">
                <span ref={bottomItemRef}>Portfolio 2023</span>
            </div>
        </div>
    )
}
