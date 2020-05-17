import React, { useState } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import golfCourse from "../data/golf-course.json";
import holes from "../data/holes.json";
import coordyWithHat from "../assets/coordy-golf-hat.png";
import { generateWalkingPath } from "../services/geospatial-services";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  width: number | string;
  height: number | string;
};

export default function App() {
  const [coordy] = useState<any>(holes.features[0]);
  const [walkingPath, setWalkingPath] = useState<any>();
  const [viewport, setViewport] = useState<Viewport>({
    width: "100%",
    height: "100vh",
    latitude: 30.948978863202708,
    longitude: -95.24198055267337,
    zoom: 14.8,
  });

  return (
    <div className="map__container">
      <ReactMapGL
        mapboxApiAccessToken={token}
        {...viewport}
        onViewportChange={(newViewport: Viewport) => setViewport(newViewport)}
      >
        <button
          onClick={() => {
            walkingPath
              ? setWalkingPath(null)
              : setWalkingPath(generateWalkingPath(holes as any));
          }}
        >
          Show Walking Path
        </button>
        <Source id="golf-course" type="geojson" data={golfCourse as any}>
          <Layer
            id="golf-course-style"
            type="fill"
            paint={{
              "fill-color": "green",
              "fill-opacity": 0.2,
            }}
          />
        </Source>
        <Source id="holes" type="geojson" data={holes as any}>
          <Layer
            id="holes-style"
            type="circle"
            paint={{ "circle-color": "black" }}
          />
        </Source>
        <Marker
          latitude={coordy.geometry.coordinates[1]}
          longitude={coordy.geometry.coordinates[0]}
          offsetLeft={-17}
          offsetTop={-20}
        >
          <img
            alt="Coordy wearing an overly-real-looking golf hat"
            src={coordyWithHat}
          />
        </Marker>
        {walkingPath && (
          <Source id="walking-path" type="geojson" data={walkingPath}>
            <Layer
              id="walking-path-style"
              type="line"
              paint={{ "line-color": "gray" }}
            />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
}
