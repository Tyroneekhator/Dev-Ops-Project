import UserForm, { UserValues } from "../components/UserForm";
import { useMutation } from "react-query";
import axios from "axios";
import Alert from "../components/Alert";
import Image from "next/image";
import { AdvancedImage } from "@cloudinary/react";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";

export default function AddUser() {
  const { data: session } = useSession();
  const { isLoading, isSuccess, isError, mutate } = useMutation(
    (user: UserValues) => {
      console.log(user)
      return axios.post("/api/user/", user);
    }
  );
  return (
    <div className="container flex justify-center">
      <div className="mx-auto px-12 bg-slate-100 dark:bg-slate-800 rounded">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none dark:text-white text-gray-900">
          User Profile
        </h1>
        <div>
          <h2>User Name</h2>
          <h3>{session?.user?.name}</h3>
          <h2>User Email</h2>
          <h3>{session?.user?.email}</h3>
        </div>
        <div className="dark:text-white">
          <Image
            unoptimized
            src={session?.user?.image}
            alt="Picture of the author"
            width={250}
            height={250}
          />
        </div>
        <UserForm onSubmit={(user) => mutate(user)} />
      </div>
    </div>
  );
}
