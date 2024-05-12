import { useClickAway } from "ahooks";
import { useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../shadcn/ui/command";

const options = [
  {
    title: "节点",
    children: [
      {
        title: "标题一",
        key: "h1",
        onClick: () => {},
      },
    ],
  },
  {
    title: "样式",
    children: [
      {
        title: "加粗",
        key: "bold",
        onClick: () => {},
      },
    ],
  },
];

const optionChildren = options.reduce(
  (prev, current) => {
    return prev.concat(current.children);
  },
  [] as (typeof options)[0]["children"]
);

const EditorFloatMenu = (props: { onClose?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    props.onClose?.();
  }, ref);

  return (
    <Command
      loop
      className="shadow-2xl"
      ref={ref}
      filter={(value, search) => {
        const find = optionChildren.find((d) => d.key === value);
        if (find) {
          return find.title.includes(search) ? 1 : 0;
        }
        return 0;
      }}
    >
      <CommandInput
        placeholder="搜索"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            props.onClose?.();
          }
        }}
      />

      <CommandList>
        <CommandEmpty>无数据</CommandEmpty>
        {options.map((item, index) => {
          return (
            <div key={item.title}>
              <CommandGroup heading={item.title}>
                {item.children.map((d) => {
                  return (
                    <CommandItem
                      onSelect={() => {
                        d.onClick?.();
                        props.onClose?.();
                      }}
                      key={d.key}
                      value={d.key}
                      onClick={() => {
                        d.onClick?.();
                        props.onClose?.();
                      }}
                    >
                      {d.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {index < options.length - 1 && <CommandSeparator />}
            </div>
          );
        })}
      </CommandList>
    </Command>
  );
};

export default EditorFloatMenu;
