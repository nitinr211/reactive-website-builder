import React from "react";
import {Carousel} from "react-bootstrap";



const VideoCarousel = () =>{
    const videoProperties=[
       {
        id: 1,
        title: "video1",
        src: vid1,
        credit: "Video by cottonbro from Pexels"
       },
       {
        id: 2,
        title: "video1",
        src: vid1,
        credit: "Video by cottonbro from Pexels"
       },
       {
        id: 3,
        title: "video1",
        src: vid1,
        credit: "Video by cottonbro from Pexels"
       }
    ]

    return <div className="App">
        <Carousel>
           {videoProperties.map((videoObj)=>{
            return (
                <Carousel.Item key= {videoObj.id}>
                    <ReactPlayer 
                        url={videoObj.src}
                        width= '100%'
                        pip={true}
                        controls={true}
                        playing={true}
                    />
                    <Carousel.Caption>
                        <h3>{videoObj.title}</h3>
                        <p>{videoObj.credit}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
            )
           


            })}
            
        </Carousel>

    </div>

}