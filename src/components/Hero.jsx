import React, {useRef, useEffect, useContext} from 'react'
import { SocialMedia } from './Links'
import gsap from 'gsap';
import { PageTransitionContext, PreloaderContext } from '../App';
import { pageAnimation } from '../funcs/app';

export default function Hero() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    
    useEffect(()=>{


        const target = '.hero-role-text'
        pageAnimation(showTransition, preloaderPerformed, target)


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
