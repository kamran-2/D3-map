import * as d3 from "d3";
import * as topojson from "topojson-client";
import { get_otherdata } from "../Api/api";

const extractdata = async () => {
  const jsondata = await d3.json("https://d3js.org/world-50m.v1.json");
  const tsvdata = await d3.tsv(
    "https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"
  );

  console.log(tsvdata);
  const countries = topojson.feature(
    jsondata,
    jsondata.objects.countries
  ).features;


  const other_data = await get_otherdata();

  countries.forEach((d) => {
    d.countryName = tsvdata.filter((value) => value.iso_n3 == d.id);
  });
  
  console.log(countries);

  

  return countries;
};

export { extractdata };
