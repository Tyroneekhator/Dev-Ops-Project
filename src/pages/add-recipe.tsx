import RecipeForm, { RecipeValues } from "../components/RecipeForm";
import axios from "axios";
import { useMutation } from "react-query";
import Alert from "../components/Alert";

export default function AddRecipe() {
  const { isLoading, isSuccess, isError, mutate } = useMutation(
    (recipe: RecipeValues) => {
      return axios.post("/api/recipe/", recipe);
    }
  );
  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
          Add Recipe
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 dark:text-white">
          Use the form below to add a new recipe to the website!
        </p>
        {isError && (
          <div className="mt-5">
            <Alert
              label="There was a sever error, could not add a recipe!"
              variant="warning"
            />
          </div>
        )}
        {isSuccess && (
          <div className="mt-5">
            <Alert label="Recipe has been created!" variant="success" />
          </div>
        )}
        <RecipeForm
          isLoading={isLoading}
          triggerReset={isSuccess}
          onSubmit={(recipe) => mutate(recipe)}
        />
      </div>
    </div>
  );
}

//popcorn
