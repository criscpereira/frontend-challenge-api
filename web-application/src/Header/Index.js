import React from "react";

const Index = ({
        link_image
    }) => {
        
        return (
        <>
            <div style={{backgroundImage: `url(${link_image})`, 
                height: '50vh', backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'}}>
            </div>
        </>
        );

    }
  
  export default Index;
  