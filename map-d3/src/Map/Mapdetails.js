import * as d3 from "d3";
import * as topojson from "topojson-client";
import { get_otherdata } from "../Api/api";

const extractdata = async () => {
  const jsondata = await d3.json("https://d3js.org/world-50m.v1.json");
  const tsvdata = await d3.tsv(
    "https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"
  );

  const countries = topojson.feature(
    jsondata,
    jsondata.objects.countries
  ).features;

  const other_data = await get_otherdata();
  console.log(other_data[0].name.common);

  countries.forEach((d) => {
    d.countryName = tsvdata.filter((value) => value.iso_n3 == d.id);
  });

  countries.forEach((d) => {
    d.other_data = other_data.filter(
      (value) => value.name.common == d.countryName[0].sovereignt
    );
  });

  console.log(countries);

  return countries;
};

export { extractdata };
