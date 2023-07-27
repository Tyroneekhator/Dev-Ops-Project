import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";


export interface RecipeFormProps {
    onSubmit: SubmitHandler<RecipeValues>;
    isLoading?: boolean;
    triggerReset?: boolean;
    values?: DatabaseRecipeValues;
    label?: string;
}

export interface RecipeValues {
    title: string;
    author_id: string;
    category: { course: string; country: string; diet: string };
    images: string | string[];
    ingredients: Array<{ name: string; amount: string; unit: string }>;
    steps: string;
    comments: string | string[];
    visibility: string;
}

export interface DatabaseRecipeValues extends RecipeValues {
    _id?: string;
}

export default function CommentForm(props: RecipeFormProps) {
    const { data: session } = useSession();

    const { onSubmit, isLoading, triggerReset, values, label } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<RecipeValues>({
        defaultValues: { ...values },
    });

    const [comment, setComment] = useState(values?.comments ? values.comments[0] : [""]);

    return (
        // onSubmit={handleSubmit((data) => onSubmit(data))}
        <form
            onSubmit={handleSubmit((data) =>
                onSubmit({
                    ...data,
                    ...{
                        comments: comment,
                    },
                })
            )}
        >
            <div className="w-full px-3 mb-6 md:mb-0">
                <label className="racking-wide text-gray-700 text-xs font-bold mb-2">
                    Add a comment!
                </label>
                <input
                    onChange={(event) => setComment(event.target.value)}
                    disabled={isLoading}
                    data-test="comment-input"
                    type="text"
                    className="w-full py-2 bg-white dark:bg-slate-900 border-2 border-neutral-300 dark:border-slate-700 hover:border-neutral-100 dark:hover:border-slate-500;"
                    placeholder="Enter your comment..."

                />
                <p className="text-red-500 text-xs italic">
                    {errors.title && (
                        <span data-test="title-error">Title is required</span>
                    )}
                </p>
                <button
                    disabled={isLoading}
                    data-test="comment-button"
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-300 text-white font-bold py-3 px-5 mb-5 rounded"
                >
                    {label || "Post Comment"}
                </button>
            </div>
        </form>
    )

}