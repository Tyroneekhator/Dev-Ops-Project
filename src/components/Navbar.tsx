import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-5 max-w-full flex justify-between border-2 bg-gray-100 dark:bg-slate-800 placeholder:rounded fix top-0 left-0 right-0 bottom-0">
      <Link href="/">
        <Image
          alt="logo"
          layout="fixed"
          src="/img/logo_placeholder.png"
          width={50}
          height={50}
        />
      </Link>

      <div className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded">
        <Link data-test="home-button" href="/">
          <a>Home</a>
        </Link>
      </div>

      <div className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded">
        <Link href="/">
          <a>Browse Recipes</a>
        </Link>
      </div>
      {/* Not yet implemented */}
      {/* <div className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded">
        <Link href="#">
          <a>Search</a>
        </Link>
      </div> */}

      {/* Not yet implemented */}
      {/* <div className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded">
        <Link href="#">
          <a>Settings</a>
        </Link>
      </div> */}

      {!session && (
        <div
          data-test="login-button"
          className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded"
          onClick={() => signIn()}
        >
          <ArrowLeftOnRectangleIcon width={30} height={30} />
          <a>Log in</a>
        </div>
      )}

      {session && (
        <div
          data-test="logout-button"
          className="flex space-x-2 cursor-pointer p-3 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-200 rounded"
          onClick={() => signOut()}
        >
          <ArrowRightOnRectangleIcon width={30} height={30} />
          <h4>Log out</h4>
        </div>
      )}
    </nav>
  );
}
