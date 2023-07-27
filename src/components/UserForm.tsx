// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";
import Image from "next/image";
import { AdvancedImage } from "@cloudinary/react";
import { fit } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import useCloudinary from "../hooks/useCloudinary";
import { useEffect, useState } from "react";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import axios from "axios";

export interface UserFormProps {
    onSubmit: SubmitHandler<UserValues>;
    isLoading?: boolean;
    triggerReset?: boolean;
    values?: UserValues;
    label?: string;
}

export interface UserValues {
    _id?: string;
    username: string;
    email: string;
    password?: string;
    recipes_created?: string[];
    recipes_liked?: string[];
    images?: string | string[];
}

export default function EditUser(props: UserFormProps) {
    const { data: session } = useSession();

    const { onSubmit, isLoading, triggerReset, values, label } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<UserValues>({
        defaultValues: { ...values },
    });

    useEffect(() => {
        triggerReset && reset();
    }, [triggerReset, reset]);

    const styles = {
        menu: (base) => ({
            ...base,
            marginTop: 0,
        }),
    };

    const [image, setImage] = useState(values?.images ? values.images[0] : [""]);
    const [thumb, setThumb] = useState(values?.images ? values.images[0] : "");

    useEffect(() => {
        if (triggerReset) {
            setThumb("");
            setImage([]);
            reset();
        }
    }, [triggerReset, reset]);

    const { Cloudinary } = useCloudinary();

    const handleImageUpload = () => {
        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
        ) {
            console.error(`in order for image uploading to work 
      you need to set the following environment variables: 
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME  and NEXT_PUBLIC_CLOUDINARY_PRESET`);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore

        const tmpImagePath = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER + ""; // default to no folder

        // eslint-disable-next-line
        // @ts-ignore
        const imageWidget = cloudinary.createUploadWidget(
            {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
                folder: tmpImagePath, // default to no folder
                sources: ["local", "camera"],
            },
            (error, result) => {
                if (error) {
                    console.error(error);
                }

                if (result.event === "success") {
                    setImage([result.info.public_id]);
                    setThumb(result.info.public_id);
                    imageWidget.close();
                }
            }
        );

        imageWidget.open();
    };

    return (
        // onSubmit={handleSubmit((data) => onSubmit(data))}
        <form
            onSubmit={handleSubmit((data) =>
                onSubmit({
                    ...data,
                    ...{
                        images: image,
                    },
                })
            )}
        >

            <div className="flex mx-auto flex-col align-middle space-y-2 ">
                {thumb && (
                    <>
                        <TrashIcon
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                                setImage([]);
                                setThumb("");
                            }}
                        />
                        <AdvancedImage
                            className="fill  border-4 w-40 h-40 bg-blue-300 border-gray-100 rounded-md"
                            cldImg={Cloudinary.image(thumb).resize(
                                thumbnail().width(150).height(150)
                            )}
                        />
                    </>
                )}
                <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Upload a new profile picture
                </p>
                <a
                    className="cursor-pointer"
                    onClick={handleImageUpload}
                >
                    <CloudArrowUpIcon className="h-20 w-20" /> Upload Picture
                </a>
            </div>
        </form>

    )

}

