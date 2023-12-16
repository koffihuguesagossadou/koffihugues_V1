import React, {useRef, useEffect, useContext} from 'react'
import { SocialMedia } from './Links'
import gsap from 'gsap';
import { PageTransitionContext, PreloaderContext } from '../App';
import { gsapConfig } from '../config/defaults';

export default function Hero() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const timeline = gsap.timeline()
    
    useEffect(()=>{

        if((!showTransition && showTransition !== null) || preloaderPerformed)
        {
            timeline.to('.hero-role-text',{
                y: '0',
                duration: gsapConfig.duration,
                ease: gsapConfig.ease,
                stagger:{
                    amount: gsapConfig.staggerAmount
                }
            })
        }

    }, [showTransition, preloaderPerformed])

    return (
        <div className='hero-bottom'>
            <div className="hero-informations-wrapper">
                <ul className='role-list'>
                    <li>
                        <div className='hero-role-text-wrapper'>
                            <span className='hero-role-text'>full stack <em>&</em> creative developer</span>
                        </div>
                    </li>
                    <li> 
                        <div className='hero-role-text-wrapper'>
                            <span className='hero-role-text'>available for freelance</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="hero-contact-wrapper">
                <SocialMedia
                    name={'email'}
                    href='koffi.agossadou@gmail.com'
                />
                <SocialMedia
                    name={'linkedin'}
                    href=''
                />
                <SocialMedia
                    name={'instagram'}
                    href=''
                />
            </div>
        </div>
    )
}
