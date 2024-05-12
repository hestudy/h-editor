import { RenderElementProps } from "slate-react";
import { HeadingElement } from "../types";

const Heading = (props: RenderElementProps) => {
  const { level } = props.element as HeadingElement;
  if (level === 2) {
    return <h2 {...props.attributes}>{props.children}</h2>;
  }
  return <h1 {...props.attributes}>{props.children}</h1>;
};

export default Heading;
