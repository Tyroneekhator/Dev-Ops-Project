import { ComponentMeta, ComponentStory } from "@storybook/react";
import RecipeForm from "./RecipeForm";

export default {
  title: "RecipeForm",
  component: RecipeForm,
} as ComponentMeta<typeof RecipeForm>;

const Template: ComponentStory<typeof RecipeForm> = (args) => (
  <RecipeForm {...args} />
);
export const Populated = Template.bind({});
export const UnPopulated = Template.bind({});

Populated.args = {
  isLoading: false,
  triggerReset: false,
  values: {
    title: "Title",
    author_id: "Paul",
    category: { course: "Main", country: "United Kingdom", diet: "General" },
    images: "Image string",
    ingredients: [
      { name: "Butter", amount: "200", unit: "g" },
      { name: "Butter", amount: "200", unit: "g" },
    ],
    steps: "Step 1, Step 2, Step 3",
  },
};

UnPopulated.args = {
  isLoading: false,
  triggerReset: false,
};
