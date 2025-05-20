import { Location } from "@bookiwi/epubjs";

import { useReading } from "../reading-context";
import { useRecord } from "../record-context";

const useRelocated = () => {
  const { setCurrentCfi } = useRecord();
  const { setCurrentLocation } = useReading();

  const handleRelocated = (location: Location) => {
    const { cfi } = location.start;
    setCurrentCfi(cfi);
    setCurrentLocation(location);
  };

  return handleRelocated;
};

export default useRelocated;
