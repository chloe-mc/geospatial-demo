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
  const pathCoordiantes = walkingPath.geometry?.coordinates;
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
