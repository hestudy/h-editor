import { useMemo, useRef, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from "slate-react";
import "src/index.css";
import EditorFloatMenu from "./EditorFloatMenu";
import Paragraph from "./elements/Paragraph";
import Heading from "./elements/Heading";

export type HEditorProps = {
  className?: string;
};

const renderElement = (props: RenderElementProps) => {
  if (props.element.type === "heading") {
    return <Heading {...props} />;
  }
  return <Paragraph {...props} />;
};

const HEditor = (props: HEditorProps) => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [menuInfo, setMenuInfo] = useState({
    visible: false,
    rect: null as DOMRect | null,
  });
  const ref = useRef<HTMLDivElement>(null);

  const parentRect = useMemo(
    () => ref.current?.getBoundingClientRect(),
    [menuInfo]
  );

  return (
    <div
      className={`${props.className || ""} p-2 bg-gray-100 rounded relative`}
      ref={ref}
    >
      {menuInfo.visible && (
        <div
          className="absolute z-[99]"
          style={{
            top: (menuInfo.rect?.top || 0) - (parentRect?.top || 0) + 20,
            left: (menuInfo.rect?.left || 0) - (parentRect?.left || 0),
          }}
        >
          <EditorFloatMenu
            onClose={() => {
              setMenuInfo({
                visible: false,
                rect: null,
              });
              ReactEditor.focus(editor);
            }}
            editor={editor}
          ></EditorFloatMenu>
        </div>
      )}
      <Slate
        editor={editor}
        initialValue={[
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]}
      >
        <Editable
          autoFocus
          className="h-full outline-0"
          renderElement={renderElement}
          onKeyDown={(e) => {
            if (e.ctrlKey) {
              if (e.key === "/") {
                e.preventDefault();
                if (editor.selection) {
                  const rect = ReactEditor.toDOMRange(
                    editor,
                    editor.selection
                  ).getBoundingClientRect();
                  setMenuInfo({
                    visible: true,
                    rect,
                  });
                }
              }
            }
          }}
        ></Editable>
      </Slate>
    </div>
  );
};

export default HEditor;
