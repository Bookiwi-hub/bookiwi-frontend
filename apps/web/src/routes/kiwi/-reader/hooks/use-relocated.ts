import { toast } from "sonner";

import { Location } from "@bookiwi/epubjs";
import { useSetAtom } from "@bookiwi/jotai";

import { currentLocationAtom, setCurrentCfiAtom } from "../atoms";

const useRelocated = () => {
  const setCurrentCfi = useSetAtom(setCurrentCfiAtom);
  const setCurrentLocation = useSetAtom(currentLocationAtom);

  const handleRelocated = async (location: Location) => {
    try {
      await setCurrentCfi({
        start: location.start.cfi,
        end: location.end.cfi,
      });
    } catch (error) {
      toast.error("독서 기록이 저장되지 않았습니다.");
    }
    setCurrentLocation(location);
  };

  return handleRelocated;
};

export default useRelocated;
