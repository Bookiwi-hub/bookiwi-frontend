import AnnotationContainer from "./container";
import AnnotationContents from "./contents";
import AnnotationHeader from "./header";

function Annotation() {
  return (
    <AnnotationContainer>
      <AnnotationHeader />
      <AnnotationContents />
    </AnnotationContainer>
  );
}

export default Annotation;
