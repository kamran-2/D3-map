import React from 'react';
import * as d3 from 'd3';

export default function Legend({ uniqueValues, colorScale, width, selectedProperty }) {
    

    return (
        <g className="legend" transform={`translate(${width - 150}, 20)`}>
            {uniqueValues.map((value, index) => (
                <g key={value} transform={`translate(0, ${index * 20})`}>
                    <rect
                        width={18}
                        height={18}
                        fill={colorScale(value)}
                    />
                    <text
                        x={24}
                        y={9}
                        dy="0.35em"
                        style={{ fontSize: '14px', fill: '#000' }}
                    >
                        {value}
                    </text>
                </g>
            ))}
        </g>
    );
}
