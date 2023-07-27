import dbConnect from "../../../database/dbConnect";
import Recipe from "../../../../models/Recipe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { AdvancedImage } from "@cloudinary/react";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import CommentForm from "../../../components/CommentForm";
import axios from "axios";
import RecipeForm, { DatabaseRecipeValues, RecipeValues } from "../../../components/RecipeForm";
import { useMutation } from "react-query";
// import { useSession } from "next-auth/react";
import useSession from "../../../hooks/useNextAuth";

// Viewing individual recipes to be viewed, searched by ID

function useCloudinary() {
  const cloud = new Cloudinary({
    cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  });

  return { Cloudinary: cloud };
}

export default function GetRecipe({ recipe }) {
  const { data: session } = useSession();
  const { Cloudinary } = useCloudinary();
  const { isLoading, isSuccess, isError, mutate } = useMutation(
    (updatedRecipe: RecipeValues) => {
      return axios.put(`/api/recipe/${recipe._id}`, updatedRecipe);
    })
  return (
    <div className="max-w-[100%] mx-auto mt-11 dark:bg-slate-500">
      <div className="mx-auto px-12 bg-slate-100 mt-5 p-5 rounded-lg shadow-md w-full flex dark:bg-slate-700">
        <div className="min-w-[40%] ml-3">
          <h1 className="text-xl mb-6">{recipe.title}</h1>
          <h2>By {recipe.author_id}</h2>
          <div>
            {recipe.images && (
              <AdvancedImage
                className="rounded-tl-lg"
                cldImg={Cloudinary.image(recipe.images[0]).resize(
                  fit().width(300).height(300)
                )}
              />
            )}
            {!recipe.images[0] && (
              <div>
                <h1>No Image/s provided</h1>
                <Image src="" width={300} height={300} alt="Placeholder" />
              </div>
            )}
          </div>
          <div className="flex justify-between border-b-2 border-light-gray my-6">
            <h2 className="font-semibold">Course</h2>
            <p>{recipe.category.course}</p>
          </div>
          <div className="flex justify-between border-b-2 border-light-gray my-6">
            <h2 className="font-semibold">Country</h2>
            <p>{recipe.category.country}</p>
          </div>
          <div className="flex justify-between border-b-2 border-light-gray my-6">
            <h2 className="font-semibold">Diet</h2>
            <p>{recipe.category.diet}</p>
          </div>
          <div className="flex justify-between border-b-2 border-light-gray">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs dark:bg-slate-800 dark:text-white border-b-2 font-semibold text-gray-700 border-gray-200 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                  <th className="p-3 rounded-tl-lg">Ingredient Name</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((r) => (
                  <tr data-test="recipe-item" key={r._id}>
                    <td className="p-2 rounded-l-lg">{r.name}</td>
                    <td> {r.amount}</td>
                    <td> {r.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between border-b-2 border-light-gray">
            <h2 className="font-semibold"> Steps </h2>
            <p className="">{recipe.steps}</p>
          </div>
          <div className="flex justify-between border-b-2 border-light-gray">
            <h2 className="font-semibold"> Likes </h2>
            <p className=""> </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs border-b-2 font-semibold text-gray-700 border-gray-200 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <th className="w-full py-2 bg-white text-slate-500 dark:text-white dark:bg-slate-900 border-2 border-neutral-300 dark:border-slate-700 hover:border-neutral-100 dark:hover:border-slate-500;">Comments</th>
              </tr>
            </thead>

            {recipe.comments && (
              <tbody>
                {recipe.comments.map((r) => (
                  <tr data-test="comment-item" key={r._id}>
                    <td className="p-2 rounded-l-lg">{r}</td>
                  </tr>
                ))}
              </tbody>
            )}
            {recipe.comments == 0 && (
              <h1>No Comments, yet!</h1>
            )}


          </table>
          {session && (
            <div>
              <CommentForm
                isLoading={isLoading}
                triggerReset={isSuccess}
                values={recipe}
                onSubmit={(recipe) => mutate(recipe)} />
            </div>
          )}
          {!session && (
            <div>
              <h1>Sign in to comment!</h1>
            </div>
          )}

        </div>
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
