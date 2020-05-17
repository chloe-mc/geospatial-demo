import * as turf from "@turf/turf";

export const generateWalkingPath = (
  holes: turf.FeatureCollection
): turf.Feature<turf.LineString> => {
  const coordinates = turf.coordAll(holes);
  return turf.lineString(coordinates);
};
