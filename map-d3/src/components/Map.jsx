import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { extractdata } from '../Map/Mapdetails';
import Tooltip from './Tooltip';


export default function Map() {
    const svgRef = useRef();
    const [toolkit, setToolkit] = useState({ visible: false, x: 0, y: 0, country: {} });

    useEffect(() => {
        const width = 960;
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Define a projection
        const projection = d3.geoMercator()
            .scale(150)
            .translate([width / 2, height / 1.5]);

        // Define a path generator
        const path = d3.geoPath().projection(projection);

        const data = async () => {
            const worldData = await extractdata();

            // console.log(worldData);
            svg.selectAll("path")
                .data(worldData)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", "#69b3a2")
                .attr("stroke", "#000")
                .on("mouseover", function (event, d) {
                    d3.select(this).attr("fill", "#ff7f50");
                    const [x, y] = d3.pointer(event);
                    setToolkit({
                        visible: true,
                        x,
                        y,
                        country: { name: d.countryName[0].name }, 
                    });
                })
                .on("mousemove", function (event) {
                    const [x, y] = d3.pointer(event);
                    setToolkit((prev) => ({ ...prev, x, y }));
                })
                .on("mouseout", function () {
                    d3.select(this).attr("fill", "#69b3a2");
                    setToolkit({ visible: false, x: 0, y: 0, country: {} });
                });
        };
        data();
    }, []);

    return (
        <div id='map' className='relative flex h-95 w-100 justify-center items-center'>
            <svg ref={svgRef}></svg>
            {toolkit.visible &&
                <Tooltip x={toolkit.x} y={toolkit.y} country={toolkit.country} />

            }
        
        </div>
    );
}
