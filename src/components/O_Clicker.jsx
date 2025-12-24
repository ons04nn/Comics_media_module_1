import React, {useState} from "react";

export default function O_Clicker () {

    const  [count, setCount] = useState(0);

 const handleClick = () => {
    setCount(count + 1)
}

 
return(
<div className="O_Clicker">
<h1>Вы кликнули {count} раз</h1>
<button onClick = {handleClick}>Кликни меня</button>
</div>    
)
}