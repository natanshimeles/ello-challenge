
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
            <span className="close"  onClick={props.onClose}>&times;</span>
                {props.children}
          </div>
          </div>
    
    
            
        )
    }

    else{
        return <span></span>
    }


    
}