// import { AdvancedImage } from "@cloudinary/react";
// import { fit } from "@cloudinary/url-gen/actions/resize";
// import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { SpinnerCircular } from "spinners-react";
// import useCloudinary from "../hooks/useCloudinary";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// export interface ImageProps {
//   onSubmit: SubmitHandler<RecipeValues>;
//   isLoading?: boolean;
//   triggerReset?: boolean;
//   values?: ImageValues;
//   label?: string;
// }

// export interface RecipeValues {
//   title: string;
//   author_id: string;
//   category: { course: string; country: string; diet: string };
//   images: string;
//   ingredients: Array<{ name: string; amount: string; unit: string }>;
//   steps: string;
// }

// export interface ImageValues extends RecipeValues {
//   _id?: string;
//   images: string;
// }

// export default function ImageForm(props: ImageProps) {
//   const { onSubmit, isLoading, triggerReset, values, label } = props;
//   console.log(values);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<RecipeValues>({
//     defaultValues: { ...values },
//   });

//   const { data } = useSession();

//   const [image, setImage] = useState(values?.images ? values.images[0] : [""]);
//   const [thumb, setThumb] = useState(values?.images ? values.images[0] : "");

//   useEffect(() => {
//     if (triggerReset) {
//       setThumb("");
//       setImage([]);
//       reset();
//     }
//   }, [triggerReset, reset]);

//   const { Cloudinary } = useCloudinary();

//   const handleImageUpload = () => {
//     if (
//       !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
//       !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
//     ) {
//       console.error(`in order for image uploading to work
//       you need to set the following environment variables:
//       NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  and NEXT_PUBLIC_CLOUDINARY_PRESET`);
//     }
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-ignore

//     const tmpImagePath = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER + ""; // default to no folder

//     // eslint-disable-next-line
//     // @ts-ignore
//     const imageWidget = cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
//         folder: tmpImagePath, // default to no folder
//         sources: ["local", "camera"],
//       },
//       (error, result) => {
//         if (error) {
//           console.error(error);
//         }

//         if (result.event === "success") {
//           setImage([result.info.public_id]);
//           setThumb(result.info.public_id);
//           imageWidget.close();
//         }
//       }
//     );

//     imageWidget.open();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit((data) =>
//         onSubmit({
//           ...data,
//           ...{
//             photos: image,
//           },
//         })
//       )}
//     >
//       <div className="flex flex-col align-middle  space-y-2">
//         {JSON.stringify(image)}
//         {thumb && (
//           <>
//             <TrashIcon
//               className="w-6 h-6 cursor-pointer"
//               onClick={() => {
//                 setImage([]);
//                 setThumb("");
//               }}
//             />
//             <AdvancedImage
//               className="fill  border-4 w-40 h-40 bg-blue-300 border-gray-100 rounded-md"
//               cldImg={Cloudinary.image(thumb).resize(
//                 thumbnail().width(150).height(150)
//               )}
//             />
//           </>
//         )}
//         <a
//           className="mx-auto border-4 fill gray-outline-button cursor-pointer"
//           onClick={handleImageUpload}
//         >
//           <CloudArrowUpIcon className="h-20 w-20" /> Add Image
//         </a>
//         <div className="flex justify-center w-full mt-3">
//           <div className="flex">
//             <button
//               type="submit"
//               disabled={isLoading}
//               data-test="submit-button"
//               className={`blue-button_no-icon flex ${isLoading && "p-0"}`}
//             >
//               {isLoading && <SpinnerCircular className="w-6 h-6 mt-1" />}
//               Add To Database
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

export {};
