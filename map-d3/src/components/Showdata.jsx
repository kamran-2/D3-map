import React from 'react'

export default function Showdata(prop) {
  console.log(prop.value);

  return (
    <div className='fixed bottom-0 left-0 bg-white p-4'>
      {prop.value && prop.value.flags && (
        <img src={prop.value.flags.png} alt='' className='h-11' />
      )}
      <h1>Name:  {prop.value?.name?.common || 'N/A'}</h1>
      <h1>Capital: {prop.value?.capital || 'N/A'}</h1>
      <h1>Area: {prop.value?.area ? `${prop.value.area} km²` : 'N/A'}</h1>
      <h1>Population: {prop.value?.population || 'N/A'}</h1>
    </div>
  )
}
