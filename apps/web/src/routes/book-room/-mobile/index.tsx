import { ReaderProvider } from "../-reader";

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
      <MobileBookRoomContent />
    </ReaderProvider>
  );
}

export default MobileBookRoom;
