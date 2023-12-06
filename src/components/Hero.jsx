import React, {useRef, useEffect} from 'react'
import { SocialMedia } from './Links'
import gsap from 'gsap';

export default function Hero() {


    const timeline = gsap.timeline()
    
    useEffect(()=>{
        timeline.to('.hero-role-text',{
            y: '0',
            delay: 2.7,
            duration: 3,
            ease: 'power4.out'
        })
    }, [])

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
