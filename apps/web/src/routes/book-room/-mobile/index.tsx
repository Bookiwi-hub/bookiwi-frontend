import { ReaderProvider } from "../-reader";

import { MobileContextProvider } from "./context";
import MobileHeader from "./header";
import MobileMenu from "./menu";
import MobileViewer from "./viewer";

function MobileBookRoomContent() {
  return (
    <div className="size-full">
      <MobileHeader />
      <MobileViewer />
      <MobileMenu />
    </div>
  );
}

function MobileBookRoom() {
  return (
    <ReaderProvider>
      <MobileContextProvider>
        <MobileBookRoomContent />
      </MobileContextProvider>
    </ReaderProvider>
  );
}

export default MobileBookRoom;
