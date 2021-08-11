import { useEffect, useState } from "react"

export function Async(){

    const [ isButtonVisible, setIsButtonVisible] = useState(true)

    useEffect(()=>{

        setTimeout(() => {
            setIsButtonVisible(false)
        },100);


    },[])


    return(


        <div>
            <p>Hello world</p>
            {isButtonVisible && <button>Visible</button>}
        </div>


    )
}