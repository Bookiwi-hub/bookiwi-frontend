import MobileBook from "./book";
import { MobileState, useMobileContext } from "./context";

function MobileViewer() {
  const { state } = useMobileContext();
  const isAnnotationOpen = state === MobileState.ANNOTATION;

  return (
    <div className="relative size-full">
      <MobileBook />
      {isAnnotationOpen && (
        <div className="absolute inset-0 z-10">
          <div>Annotation</div>
        </div>
      )}
    </div>
  );
}

export default MobileViewer;
