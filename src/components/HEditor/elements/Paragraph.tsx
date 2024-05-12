import { useMemo } from "react";
import { Range } from "slate";
import {
  RenderElementProps,
  useSelected,
  useSlateSelection,
} from "slate-react";

const Paragraph = (props: RenderElementProps) => {
  const selected = useSelected();
  const selection = useSlateSelection();

  const isEmpty = useMemo(() => {
    if (selected && selection && !Range.isExpanded(selection)) {
      if (props.element.children.length === 1) {
        if (props.element.children[0].text === "") {
          return true;
        }
      }
    }
    return false;
  }, [props.element, selected, selection]);

  return (
    <p
      {...props.attributes}
      className={
        isEmpty
          ? "before:content-['键入ctrl+/唤出菜单'] before:absolute before:text-gray-500"
          : ""
      }
    >
      {props.children}
    </p>
  );
};

export default Paragraph;
