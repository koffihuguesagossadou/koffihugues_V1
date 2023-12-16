import { useRef, useMemo, useContext, useCallback, useEffect, useState } from "react"
import { projects } from "../data/project"
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Color, Texture, TextureLoader, MathUtils } from "three"
import { ScrollControls, Scroll, shaderMaterial, Text, useScroll, Image } from '@react-three/drei';
import { CursorContext, PageTransitionContext } from "../App";
import vertexShader from '../glsl/vertexShaders.glsl'
import fragmentShader from '../glsl/fragmentShaders.glsl'
import { useSpring, animated } from '@react-spring/three'
import { useNavigate } from "react-router-dom"; 
import gsap from 'gsap';


export function ProjectCard({name, img, index, width,slug}) {
    

    const texture = useMemo(() => useLoader(TextureLoader, img));


    const meshRef = useRef();
    const imageRef = useRef();
    const shaderRef = useRef();
    const textRef = useRef()


    const { cursorOnLink, setCursorOnLink } = useContext(CursorContext);
    const { showTransition, setShowTransition } = useContext(PageTransitionContext)
    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate()

    const scroll = useScroll()

    // mesh functions
    const handleMeshOnPointerEnter = useCallback(() => {
        setHovered(true)
    })

    const handleMeshOnPointerLeave = useCallback(() => {
        setHovered(false)
    })

    const handleOnCLick = useCallback(()=>{
        setShowTransition(true)
        
        setTimeout(()=>{
            navigate(`/project/${slug}`)
        }, 1500)
    })

    
    
    const photo = useMemo(() => {
        return {
          width: 2.5,
          height: 3,
          gap: 0.5,
          x: (2.5 + 0.3) * index ,
          y: 0,
        };
    }, [index]);


    // spring animation config
    

    // const WaveShaderMaterial = shaderMaterial({
    //     uTime: 0,
    //     uTexture: new Texture(),
    //     uColor: new Color(0.5, 0.5, 0.5)
        
    // },vertexShader, fragmentShader);

    // extend({ WaveShaderMaterial })

    useFrame(({clock}) => {
        // shaderRef.current.uTime = clock.getElapsedTime()
        // textRef.current.scale.x = hovered ? MathUtils.lerp(textRef.current.scale.x, 1, 0.25) : MathUtils.lerp(textRef.current.scale.x, 0, 0.25)
        // const a = scroll.curve(index / projects.length - -0.5 / projects.length , 1 / projects.length)
        // meshRef.current.position.z = a / 2
        // imageRef.current.scale.y = 3 + a
        imageRef.current.material.grayscale = hovered ? MathUtils.lerp(imageRef.current.material.grayscale, 0, 0.1) :  MathUtils.lerp(imageRef.current.material.grayscale, 0.9, 0.1)
        imageRef.current.material.zoom = hovered ? MathUtils.lerp(imageRef.current.material.zoom, 1.6, 0.1) : MathUtils.lerp(imageRef.current.material.zoom, 1.4, 0.1)
    });

    // useEffect(()=>{
    // },[])
    
    return(
        <>
        
            {/* <group>   
                
                <animated.mesh 
                    ref={meshRef} 
                    onPointerOver={handleMeshOnPointerEnter} 
                    onPointerOut={handleMeshOnPointerLeave}
                    onClick={ handleOnCLick }
                    position={[photo.x, photo.y, 0]}
                >
                    <planeGeometry ref={imageRef} args={[photo.width,photo.height, 20, 20]} />
                    <waveShaderMaterial ref={ shaderRef } uTexture={texture}/>
                </animated.mesh>

                
                
                <Text 
                    ref={textRef} 
                    fontSize=".22" 
                    font='/font/analogue-webfont.ttf' 
                    color={[0.67, 0.67, 0.67]}  
                    scale={[0, 1, 1]}
                    position={[photo.x, -2.3, 0]}
                    onPointerEnter={()=>{setHovered(true)}}
                    onPointerLeave={()=>{setHovered(false)}}
                >

                    {name.toUpperCase()}
                </Text>
            </group> */}

            <Image 
                ref={imageRef}
                url={img} 
                zoom={1.4}
                position={[photo.x, photo.y, 0]} 
                scale={[photo.width, photo.height, 1]} 
                onPointerOver={ handleMeshOnPointerEnter }
                onPointerOut={ handleMeshOnPointerLeave }
                onClick={ handleOnCLick }
                
            />
        </>

    )
}


export function ProjectsCards({gap = 0.3, imageW = 2.5, damping=0.3 }) {

    const speedWheel = 0.03;
    const speedDrag = -0.1;

    const [$root, setRoot] = useState();
    const { viewport } = useThree();
    const xW = imageW + gap
    const projectLength = projects.length


    const progress = useRef(0);
    const startX = useRef(0);
    const isDown = useRef(false)
    const $items = useMemo(() => {
        if ($root) return $root.children;
    }, [$root]);


    // display idem on scroll
    const displayItems = (item, index, active) => {
        gsap.to(item.position, {
            x: (index - active) * xW,
            y: 0,
            duration: 2.5,
            ease: "power3.out",
        });
    };

    //handle on wheel
    const handleWheel = (e)=>{
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
         const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
         progress.current = progress.current + wheelProgress * speedWheel;
        console.log(progress.current)
    }

    /*--------------------
    Handle Move
    --------------------*/
    const handleMove = (e) => {
        if (!isDown.current) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const mouseProgress = (x - startX.current) * speedDrag;
        progress.current = progress.current + mouseProgress;
        startX.current = x;
    }

    // handle on pointerDown
    const handleDown = (e) => {
        isDown.current = true;
        startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };
    
    
    // handle on pointerDown
    const handleUp = (e) => {
        isDown.current = false;
    };


    // animation frame
    useFrame(()=>{
        progress.current = Math.max(0, Math.min(progress.current, 100));

        const active = Math.floor((progress.current / 100) * ($items.length - 1));
        $items.forEach((item, index) => displayItems(item, index, active));
    })

    useEffect(()=>{

    }, [])
    

    return(

        // <ScrollControls 
        //     style={{overflow: 'hidden'}} 
        //     horizontal 
        //     pages={(width - xW + (projectLength) * xW) / (width ) } 
        //     damping={damping}
        // >
                
        //         <Scroll>

        //             {
        //                 projects.map((project, i)=>{
        //                     return(
                                
        //                         <ProjectCard
        //                             key={i}
        //                             index = {i}
        //                             img = {project.image}
        //                             name = { project.name}
        //                             slug = { project.slug }
        //                             width = {width}
        //                         />
        //                     )
        //                 })
        //             }
        //         </Scroll>
        //     </ScrollControls>

        
        <>
        
        
            <mesh
                onWheel={ handleWheel }
                onPointerMove={ handleMove }
                onPointerDown={ handleDown }
                onPointerLeave={ handleUp }
                onPointerCancel={ handleUp }
                onPointerUp={ handleUp }
            >
                <planeGeometry args={[viewport.width, viewport.height]} />
                <meshBasicMaterial transparent={true} opacity={0} />
            </mesh>
            <group
                ref={setRoot}
            >
                {
                    projects.map((project, i)=>{
                        return(
                            
                            <ProjectCard
                                key={i}
                                index = {i}
                                img = {project.image}
                                name = { project.name}
                                slug = { project.slug }
                            />
                        )
                    })
                }
            </group>
        </>
    )
}

export function ArchiveProject({name, description, skills, link}) {
    return(
        <div className="ap-card-infos">
            <div className="archive-project-item">
                <div className="archive-project-header">
                   <div className="archive-project-name">{name}</div>
                    <div className="archive-project-link">{link}</div> 
                </div>
                <div className="archive-project-body">                    
                    <div className="archive-project-description">{description}</div>
                </div>
                <div className="archive-project-footer">
                    <div className="archive-project-skills">
                        {
                            skills.map((value, index) => {
                                return <span key={index}>
                                    {value}
                                </span>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}