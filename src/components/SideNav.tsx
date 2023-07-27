import React from "react";
import Link from "next/link";
// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";

const SideNav = () => {
  const { data: session } = useSession();
  return (
    <aside className="w-64 mt-12 mr-5 pt-12" aria-label="Sidebar">
      {session && (
        <div className="overflow-y-auto py-4 px-3 border-2 bg-gray-100 dark:bg-slate-800 rounded-r-lg">
          <ul className="space-y-2">
            <p className="flex items-center p-2 text-base font-normal text-gray-700 dark:text-white">
              {session?.user?.name}
            </p>
            <li>
              <Link href="/edit-user">
                <a className="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
                  <span className="ml-3 ">Edit Profile</span>
                </a>
              </Link>
            </li>
            <li data-test="add-recipe-button">
              <Link href="/add-recipe">
                <a className="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Add Recipe
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user-recipes">
                <a className="flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700">
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    My Recipes
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};
export default SideNav;
