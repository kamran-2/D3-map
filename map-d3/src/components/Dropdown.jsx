import React from 'react'

export default function Dropdown(prop) {
    console.log(prop)
  return (
      <div className="absolute top-0 left-0 p-4">
         
          <select
              id="colorProperty"
              value={prop.selectedProperty}
              onChange={(e) => prop.setSelectedProperty(e.target.value)}
              className="border rounded px-2 py-1"
          >
              <option value="income_grp">Income Group</option>
              <option value="pop_est">Population</option>
              <option value="economy">Economy</option>
          </select>
      </div>
  )
}
