import React, {useEffect, useContext, useState} from 'react'
import { SocialMedia } from './Links'
import gsap from 'gsap';
import { PageTransitionContext, PreloaderContext } from '../App';
import { pageAnimation } from '../funcs/app';
import { me } from '../data/me'

export default function Hero() {

    const {showTransition} = useContext(PageTransitionContext)
    const { preloaderPerformed } = useContext(PreloaderContext)
    const [getContacts, setContacts] = useState({})
    
    useEffect(()=>{


        if(Object.values(getContacts).length === 0)
        {

            setContacts({...me.contact})
        }



        const target = '.hero-role-text'
        pageAnimation(showTransition, preloaderPerformed, target)


    }, [showTransition, preloaderPerformed, getContacts])

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
                    href={getContacts.email}
                />
                <SocialMedia
                    name={'github'}
                    href={getContacts.github}
                />
                <SocialMedia
                    name={'linkedin'}
                    href={getContacts.linkedin}
                />
                <SocialMedia
                    name={'instagram'}
                    href={getContacts.instagram}
                />
            </div>
        </div>
    )
}
