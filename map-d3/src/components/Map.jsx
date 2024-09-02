import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { extractdata } from '../Map/Mapdetails';
import Tooltip from './Tooltip';
import Showdata from './Showdata';
import Dropdown from './Dropdown';
import Legend from './Legend';
import Scale from './Scale';

export default function Map() {
    const svgRef = useRef();
    const [toolkit, setToolkit] = useState({ visible: false, x: 0, y: 0, country: {} });
    const [selectedProperty, setSelectedProperty] = useState('income_grp');
    const [getdata, setdata] = useState();
    const [uniqueValues, setUniqueValues] = useState([]);
    const [colorScale, setColorScale] = useState(() => d3.scaleOrdinal());

    useEffect(() => {
        const width = 1100;
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Define a projection
        const projection = d3.geoMercator()
            .scale(115)
            .translate([width / 2.2, height / 1.5]);

        // Define a path generator
        const path = d3.geoPath().projection(projection);

        const data = async () => {
            const worldData = await extractdata();
            let colorScale = '';

            // Clear existing paths before re-rendering
            svg.selectAll("path").remove();

            // Get unique values for the selected property
            const uniqueValues = [...new Set(worldData.map(d => d.countryName[0][selectedProperty]))];
            uniqueValues.sort();
            setUniqueValues(uniqueValues);  // Set unique values state

            if (selectedProperty == 'pop_est') {
                const populations = worldData.map(d => d.countryName[0][selectedProperty]);
                const minPop = d3.min(populations);
                const maxPop = d3.max(populations);

                // Initialize color scale for population
                colorScale = d3.scaleSequential(d3.interpolateBlues)
                    .domain([minPop, maxPop]);
                setColorScale(() => colorScale);  // Set color scale state
            }
            else {
                colorScale = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain(uniqueValues);
                setColorScale(() => colorScale);  // Set color scale state
            }


            svg.selectAll("path")
                .data(worldData)
                .enter().append("path")
                .attr('class', 'mycount')
                .attr("d", path)
                .attr("fill", d => colorScale(d.countryName[0][selectedProperty]))
                .attr("stroke", "#000")
                .on("mouseover", function (event, d) {
                    const [x, y] = d3.pointer(event);
                    setToolkit({
                        visible: true,
                        x,
                        y,
                        country: { name: d.countryName[0].name },
                    });
                    setdata(d.other_data[0]);
                })
                .on("mousemove", function (event) {
                    const [x, y] = d3.pointer(event);
                    setToolkit((prev) => ({ ...prev, x, y }));
                    setdata((prev) => ({ ...prev }));
                })
                .on("mouseout", function () {
                    setToolkit({ visible: false, x: 0, y: 0, country: {} });
                });
        };
        data();

    }, [selectedProperty]);

    return (
        <div id='map' className='relative flex w-100 justify-center items-center'>
            <Dropdown setSelectedProperty={setSelectedProperty} selectedProperty={selectedProperty} />
            <svg ref={svgRef}>
                {uniqueValues.length > 0 && selectedProperty!='pop_est' &&(
                    <Legend uniqueValues={uniqueValues} selectedProperty={selectedProperty} colorScale={colorScale} width={960} />
                )}
                {selectedProperty == "pop_est" && <Scale colorScale={colorScale} width={300} />}
            </svg>
            {toolkit.visible && <>
                <Tooltip x={toolkit.x} y={toolkit.y} country={toolkit.country} />
                <Showdata value={getdata} />
            </>
            }

        </div>
    );
}
