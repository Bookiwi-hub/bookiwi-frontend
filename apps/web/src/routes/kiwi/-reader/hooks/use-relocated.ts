import { Location } from "@bookiwi/epubjs";
import { currentLocationAtom, useSetAtom } from "@bookiwi/jotai";

import { setCurrentCfiAtom } from "../atoms/record";

const useRelocated = () => {
  const setCurrentCfi = useSetAtom(setCurrentCfiAtom);
  const setCurrentLocation = useSetAtom(currentLocationAtom);

  const handleRelocated = async (location: Location) => {
    const { cfi } = location.start;
    await setCurrentCfi(cfi);
    setCurrentLocation(location);
  };

  return handleRelocated;
};

export default useRelocated;
