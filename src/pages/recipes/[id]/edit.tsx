import dbConnect from "../../../database/dbConnect";
import Recipe from "../../../../models/Recipe";
import { GetServerSideProps } from "next";
import RecipeForm, { DatabaseRecipeValues, RecipeValues } from "../../../components/RecipeForm";
import axios from "axios";
import { useMutation } from "react-query";
import Alert from "../../../components/Alert";

export default function EditRecipe({ recipe }: { recipe: DatabaseRecipeValues }) {
    const { isLoading, isSuccess, isError, mutate } = useMutation(
        (updatedRecipe: RecipeValues) => {
            return axios.put(`/api/recipe/${recipe._id}`, updatedRecipe);
        }
    );
    return (
        <div className="container flex justify-center ">
            <div className="w-full max-w-3xl">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                    Edit Recipe
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 dark:text-white">
                    Use the form below to edit the recipe!
                </p>
                {isError && (
                    <div className="mt-5">
                        <Alert
                            label="There was a sever error, could not update recipe!"
                            variant="warning"
                        />
                    </div>
                )}
                {isSuccess && (
                    <div data-test="edit-success" className="mt-5">
                        <Alert label="Recipe has been updated!" variant="success" />
                    </div>
                )}
                <RecipeForm
                    isLoading={isLoading}
                    triggerReset={isSuccess}
                    values={recipe}
                    label="Update Recipe"
                    onSubmit={(recipe) => mutate(recipe)}
                />
            </div>
        </div>
    );
}

// Grab data as soon as connected to server for fast frontend data display
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    await dbConnect();

    const recipe = await Recipe.findById(params.id).lean();

    return { props: { recipe: { ...recipe, _id: recipe._id.toString() } } };
};
//popcorn
