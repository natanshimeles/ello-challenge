import { ReactChild, ReactChildren } from "react";

interface DialogProps{
    isVisble: boolean;
    width: string
    height: string,
    children?: any,
    onClose: ()=>void
}


export default function Dialog(props: DialogProps){

    if(props.isVisble){
        return (

            <div className="dialog">
            <div className="dialog-content">
            <span className="close">&times;</span>
            <span><button onClick={props.onClose}>Close</button></span>
                {props.children}
          </div>
          </div>
    
    
            
        )
    }

    else{
        return <span></span>
    }


    
}