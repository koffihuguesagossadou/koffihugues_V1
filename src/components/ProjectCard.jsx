import { useRef, useMemo, useContext, useCallback, useEffect, useState } from "react"
import { projects } from "../data/project"
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Color, Texture, TextureLoader, MathUtils } from "three"
import { ScrollControls, Scroll, shaderMaterial, Text, useScroll } from '@react-three/drei';
import { CursorContext } from "../App";


export function ProjectCard({name, img, x, width}) {
    

    const [texture] = useMemo(() => useLoader(TextureLoader, [img]));
    const meshRef = useRef();
    const imageRef = useRef();
    const shaderRef = useRef();
    const textRef = useRef()
    const { cursorOnLink, setCursorOnLink } = useContext(CursorContext);
    const [hovered, setHovered] = useState(false)

    // mesh functions
    const handleMeshOnPointerEnter = useCallback(() => {
        setHovered(true)
    })

    const handleMeshOnPointerLeave = useCallback(() => {
        setHovered(false)
    })

    
    const photo = useMemo(() => {
        return {
          width: 3,
          height: 4,
          gap: 1,
          x: (3+1) * x ,
          y: 0,
        };
      }, [x]);


    

    const WaveShaderMaterial = shaderMaterial(
        //uniforms
        {
            uTime: 0,
            uTexture: new Texture(),
            uColor: new Color(0.5, 0.5, 0.5)
        },
        // vertex shader
        `   
            precision mediump float;

            uniform float uTime;
            varying vec2 vUv;
            varying float vWave;
            
            vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }


            vec4 permute(vec4 x) {
                return mod289(((x*34.0)+1.0)*x);
            }

            vec4 taylorInvSqrt(vec4 r)
            {
                return 1.79284291400159 - 0.85373472095314 * r;
            }

            float snoise(vec3 v) {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                
                // First corner
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;
                
                // Other corners
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );
              
                //   x0 = x0 - 0.0 + 0.0 * C.xxx;
                //   x1 = x0 - i1  + 1.0 * C.xxx;
                //   x2 = x0 - i2  + 2.0 * C.xxx;
                //   x3 = x0 - 1.0 + 3.0 * C.xxx;
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
                
                // Permutations
                i = mod289(i);
                vec4 p = permute( permute( permute(
                           i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                         + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                         + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                         
                // Gradients: 7x7 points over a square, mapped onto an octahedron.
                // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                float n_ = 0.142857142857; // 1.0/7.0
                vec3  ns = n_ * D.wyz - D.xzx;
              
                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
              
                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
              
                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);
              
                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );
              
                //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));
              
                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
              
                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);
                
                // Normalise gradients
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;
                
                // Mix final noise value
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                              dot(p2,x2), dot(p3,x3) ) );
              }

            void main(){
                vUv = uv;
                
                vec3 pos = position;
                float noiseFreq = 0.5;
                float noiseAmp = 0.05;
                vec3 noisePos = vec3(pos.x , pos.y * noiseFreq + uTime, pos.z);
                pos.z += snoise(noisePos) * noiseAmp;


                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
            }
        `,
        //fragment shader
        `   
            precision mediump float;

            uniform sampler2D uTexture;
            uniform vec3 uColor;
            varying float vWave;
            varying vec2 vUv;
            
            void main(){

                float ambientStrength = .3; // Adjust the ambient strength

                float wave = vWave * 0.2;
                vec3 texture = texture2D(uTexture, vUv + wave).rgb;

                // Apply ambient lighting
                vec3 finalColor = texture + uColor * ambientStrength;
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    );

    extend({ WaveShaderMaterial })

    useFrame(({clock}) => {
        shaderRef.current.uTime = clock.getElapsedTime()
        textRef.current.scale.x = hovered ? MathUtils.lerp(textRef.current.scale.x, 1, 0.25) : MathUtils.lerp(textRef.current.scale.x, 0, 0.25)
        
    });

    useEffect(()=>{

        document.body.style.cursor = hovered ? 'pointer' : 'auto'

        
    }, [hovered])

    
    
    return(
        <>
        
            <group>   
                
                <mesh 
                    ref={meshRef} 
                    onPointerEnter={handleMeshOnPointerEnter} 
                    onPointerLeave={handleMeshOnPointerLeave}
                    

                    position={[photo.x, photo.y, 0.5]}
                >
                    <planeGeometry ref={imageRef} args={[photo.width,photo.height, 20, 20]} />
                    <waveShaderMaterial ref={ shaderRef } uTexture={texture}/>
                </mesh>

                
                
                <Text 
                    ref={textRef} 
                    fontSize=".2" 
                    font='/font/analogue-webfont.ttf' 
                    color={[0.67, 0.67, 0.67]}  
                    scale={[0, 1, 1]}
                    position={[photo.x, -2.3, 0.5]}
                    onPointerEnter={()=>{setHovered(true)}}
                    onPointerLeave={()=>{setHovered(false)}}
                >

                    {name.toUpperCase()}
                </Text>
            </group>
        </>

    )
}


export function ProjectsCards({gap = 1, imageW = 3, damping=0.3 }) {

    const { width } = useThree((state) => state.viewport)
    const xW = imageW + gap
    const projectLength = projects.length
    const infiniteProjectsArray = [...projects, ...projects]

    

    return(

        <ScrollControls 
            style={{overflow: 'hidden'}} 
            horizontal 
            pages={(width - xW + (projectLength) * xW) / (width ) } 
            damping={damping}
        >
                
                <Scroll>

                    {
                        projects.map((project, i)=>{
                            return(
                                
                                <ProjectCard
                                    key={i}
                                    x = {i}
                                    img = {project.image}
                                    name = { project.name}
                                    width = {width}
                                />
                            )
                        })
                    }
                </Scroll>
            </ScrollControls>
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