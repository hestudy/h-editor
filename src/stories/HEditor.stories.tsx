import type { Meta, StoryObj } from "@storybook/react";
import { HEditor } from "lib/main";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof HEditor> = {
  component: HEditor,
};

export default meta;
type Story = StoryObj<typeof HEditor>;

export const FirstStory: Story = {
  args: {
    className: "h-[500px]",
  },
};
