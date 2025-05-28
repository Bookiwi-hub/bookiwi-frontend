import { useEffect, useState } from "react";

import getSampleKiwi from "../-apis/get-sample";

import KiwiCard from "./kiwi-card";

import { Kiwi } from "#/types/kiwi";

function KiwiSampleCard() {
  const [kiwi, setKiwi] = useState<Kiwi | null>(null);
  useEffect(() => {
    const fetchSampleKiwi = async () => {
      const sampleKiwi = await getSampleKiwi();
      if (sampleKiwi) {
        setKiwi(sampleKiwi);
      }
    };
    fetchSampleKiwi();
  }, []);
  return kiwi ? <KiwiCard kiwi={kiwi} /> : null;
}

export default KiwiSampleCard;
