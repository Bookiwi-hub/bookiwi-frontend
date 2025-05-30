import { Location } from "@bookiwi/epubjs";

import { useRecord, useReading } from "../contexts";

const useRelocated = () => {
  const { setCurrentCfi } = useRecord();
  const { setCurrentLocation } = useReading();

  const handleRelocated = async (location: Location) => {
    const { cfi } = location.start;
    await setCurrentCfi(cfi);
    setCurrentLocation(location);
  };

  return handleRelocated;
};

export default useRelocated;
