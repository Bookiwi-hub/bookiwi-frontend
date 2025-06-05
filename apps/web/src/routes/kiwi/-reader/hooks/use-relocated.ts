import { Location } from "@bookiwi/epubjs";
import { useSetAtom } from "@bookiwi/jotai";

import { currentLocationAtom, setCurrentCfiAtom } from "../atoms";

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
