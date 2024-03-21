import { nanoid } from "nanoid";



export function SevenItems({setImageLoaded,loadImgsRef,imgsRef,src, imgs}) {
    
    const imgsLength = imgs?.length

    const ImgWrapper = ({img})=>{
        return(

            <picture className="c-pic">
                <div ref={(el) => (loadImgsRef.current[img] = el)} className="onload-img"></div>
                <source srcSet={src ? '/images' + src + '/' + img + '.webp' : null} type="image/webp" />
                <img
                    onLoad={() => {
                    setImageLoaded(true);
                    }}
                    ref={(el) => (imgsRef.current[img] = el)}
                    loading="lazy"
                    src={src ? '/images' + src + '/' + img + '.jpg' : null}
                    alt={'image-' + (img + 1)}
                />
            </picture>
        )
    }


    return (
        <>
            {/* Check if imgs is an array before mapping */}
            {
                Array.isArray(imgs) &&
                 <>
                 
                    {
                        [1,2,3,4,5,6,7].map((el, _i)=>{
                            return(
                                <div key={nanoid()} className="c-pic-w pic-row-one">
                                    <ImgWrapper img={imgs[el]} />
                                </div>
                            )
                        })

                    }

                    {
                        /* display others layouts when imgs are more than 8  */
                        imgsLength > 8
                        ? 

                        <>
                            
                            <div  className="c-pic-w pic-row-one">
                                <ImgWrapper img={imgs[8]} />
                            </div>

                            
                            <div className="c-pic-w pic-row-three">
                                {
                                    [9,10,11].map((img, _i)=>{
                                        return <ImgWrapper key={nanoid()} img={imgs[img]} />
                                    })
                                }
                            </div> 
                        </>

                        :null
                    }

                 </>
            }
        </>
    )
}


export function AboveSevenItems (){
    <>
        
    </>
}