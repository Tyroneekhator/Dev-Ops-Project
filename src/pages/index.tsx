import Head from "next/head";
import { GetServerSideProps } from "next";
import { useMutation } from "react-query";
import dbConnect from "../database/dbConnect";
import Recipe from "../../models/Recipe";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";

import Alert from "../components/Alert";
import { useRouter } from "next/router";

// Export recipe data with home object
export default function Home(recipes) {
  const [recipeState, setRecipeState] = useState(recipes.recipes);
  const { data: session } = useSession();
  const router = useRouter();
  // Function to delete data, update recipe state so change is rendered on-delete

  const { isSuccess, isError, mutate } = useMutation(async (id: string) => {
    await axios.delete(`/api/recipe/${id}`);
    console.log("Recipe Deleted Succesfully");
    setRecipeState(recipeState.filter((r) => r._id !== id));
  });

  return (
    <div>
      <Head>
        <title>Recipes</title>
        <meta
          name="description"
          content="Web application for viewing and sharing recipes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto mt-4 px-4 object-fill max-w-full bg-gray-50 dark:bg-slate-500 order-2">
        <div>
          <table className="bg-white  mx-auto mt-11 p-5 rounded-lg shadow-md">
            <thead>
              <tr className="text-s border-b-2 font-semibold text-gray-700 border-gray-200 bg-gray-100 rounded-tl-lg rounded-tr-lg dark:bg-slate-800 dark:text-white ">
                <th className="p-6 rounded-tl-lg">Recipe Title</th>
                <th className="p-6 ">Author</th>
                <th className="p-6 rounded-tr-lg"> </th>
              </tr>
            </thead>
            <tbody className="rounded-lg">
              {recipeState.map((r, i) => (
                <tr
                  data-test="recipe-item"
                  key={r._id}
                  className={(i + 1) % 2 === 0 ? "bg-gray-100 dark:bg-slate-600" : "bg-gray-50 dark:bg-slate-700"} // Add background to every other entry.
                >
                  <td className="p-5 text-gray-700 dark:text-white">
                    <Link href={`/recipes/${r._id}`}>
                      <a
                        data-test="open-recipe"
                        className="cursor-pointer font-semibold"
                      >
                        {r.title}
                      </a>
                    </Link>
                  </td>
                  <td className="p-3  text-gray-700 dark:text-white"> {r.author_id}</td>
                  {/* Only show edit/delete buttons when logged in */}
                  {session && (
                    <td className="text-xs dark: text-white">
                      <PencilSquareIcon
                        data-test="edit-button"
                        className="ml-6 cursor-pointer bg-slate-300"
                        width={20}
                        height={20}
                        onClick={() => router.push(`/recipes/${r._id}/edit`)}
                      />
                      <TrashIcon
                        data-test="delete-button"
                        className="ml-6 mr-3 mt-3 cursor-pointer bg-slate-300"
                        width={20}
                        height={20}
                        onClick={() => mutate(r._id)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {isSuccess && (
            <div data-test="successful-delete">
              <Alert label="Recipe Deleted" variant="success" />
            </div>
          )}

          {isError && <Alert label="Cannot delete recipe!" variant="warning" />}
        </div>
      </main>
    </div>
  );
}

// // Grab data as soon as connected to server for fast frontend data display
export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const results = await Recipe.find({ visibility: "Public" }).lean().exec();

  // Create new array of recipes and return in object that can be read by frontend
  const recipes = results.map((doc) => ({
    ...doc,
    ...{ _id: doc._id.toString() }, // Grab Id and convert ID to string
  }));

  return { props: { recipes: recipes } };
};
