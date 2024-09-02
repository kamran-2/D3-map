import React from 'react'
import * as d3 from 'd3'
export default function Scale({ colorScale, width, height = 50, margin = { top: 15, right: 30, bottom: 10, left: 30 } }) {
    const axisScale = d3.scaleLinear()
        .domain(colorScale.domain())
        .range([margin.left, width - margin.right]);

    const axisBottom = d3.axisBottom(axisScale)
        .ticks(5)
        .tickSize(-height+10);

    // Create a gradient
    const gradientId = "legend-gradient";
    const gradientSteps = d3.range(0, 1.05, 0.05);
    return (
        <svg width={width} height={height + margin.top + margin.bottom}>
            {/* Gradient Definition */}
            <defs>
                <linearGradient id={gradientId}>
                    {gradientSteps.map((t, i) => (
                        <stop
                            key={i}
                            offset={`${t * 100}%`}
                            stopColor={colorScale(colorScale.domain()[0] * (1 - t) + colorScale.domain()[1] * t)}
                        />
                    ))}
                </linearGradient>
            </defs>
            {/* Gradient Bar */}
            <rect
                x={margin.left}
                y={margin.top}
                width={width - margin.left - margin.right}
                height={height - margin.top - margin.bottom}
                fill={`url(#${gradientId})`}
            />
            {/* Axis */}
            <g
                transform={`translate(0, ${height - margin.bottom})`}
                ref={(node) => d3.select(node).call(axisBottom)}
            />
        </svg>
    )
}
