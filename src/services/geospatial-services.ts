import * as turf from "@turf/turf";

export const generateWalkingPath = (
  holes: turf.FeatureCollection
): turf.Feature<turf.LineString> => {
  const coordinates = turf.coordAll(holes);
  return turf.lineString(coordinates);
};

export const goGolfing = (
  walkingPath: turf.Feature<turf.LineString>,
  updatePosition: (newPosition: any) => void
) => {
  const animationRoute = generateAnimationRoute(walkingPath, 300);
  const pathCoordiantes = animationRoute.geometry?.coordinates;
  let counter = 0;
  const animate = () => {
    if (counter === pathCoordiantes?.length) return;
    const nextPoint = pathCoordiantes && turf.point(pathCoordiantes[counter]);
    updatePosition(nextPoint);
    requestAnimationFrame(animate);
    counter += 1;
  };

  animate();
};

const generateAnimationRoute = (
  line: turf.Feature<turf.LineString>,
  steps: number
): turf.Feature<turf.LineString> => {
  const lineDistance = turf.lineDistance(line, {
    units: "meters",
  });
  const animationRouteInterval = lineDistance / steps;

  let distance = 0;
  const animationRoute = Array.apply(null, Array(300)).map(() => {
    const routePoint = turf.along(line, distance, { units: "meters" });
    distance += animationRouteInterval;
    return turf.getCoord(routePoint) as turf.helpers.Position;
  });

  return {
    type: "Feature",
    properties: {},
    geometry: { coordinates: animationRoute, type: "LineString" },
  };
};
