import React from 'react'

export default function Tooltip(prop) {
    // console.log(prop)
    return (
     
        <div className='tooltip absolute p-2 bg-slate-500 rounded-sm ' style={{
            left: `${prop.x}px`,
            top: `${prop.y}px`,
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
            <p>{`Country: ${prop.country.name}`}</p>
        </div>
    )
}


