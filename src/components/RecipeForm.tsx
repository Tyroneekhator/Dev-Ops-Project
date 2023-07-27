import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { course, diet, countryNames, unit, setVisibility } from "../data/";
import Select from "react-select";
import useCloudinary from "../hooks/useCloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
// import { useSession } from "next-auth/react";
import useSession from "../hooks/useNextAuth";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  visibility: string
}

export interface DatabaseRecipeValues extends RecipeValues {
  _id?: string;
}

export default function RecipeForm(props: RecipeFormProps) {
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

  const checkForValues = () => {
    const itArray = [];
    if (props?.values?.ingredients.length > 0) {
      for (let i = 0; i < props?.values?.ingredients.length; i++) {
        itArray.push({ iteration: "" });
      }
      return itArray;
    } else {
      return [{ iteration: "" }];
    }
  };

  const [iterationList, setIterationList] = useState(checkForValues);

  const handleIterationRemove = (index) => {
    const list = [...iterationList];
    list.splice(index, 1);
    setIterationList(list);
  };

  const handleIterationAdd = () => {
    setIterationList([...iterationList, { iteration: "" }]);
  };

  const options = [true, false]

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
      <div className="flex flex-wrap -mx-3 mb-3 ">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
            Recipe Visibility
          </label>
          <div data-test="visibility-input">
            <Controller
              name="visibility"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  isDisabled={isLoading}
                  className="w-full py-2 my-react-select-container"
                  classNamePrefix="my-react-select"
                  styles={styles}
                  defaultValue={{
                    label: props?.values?.visibility,
                    value: props?.values?.visibility,
                  }}
                  options={setVisibility.map((opt) => ({
                    value: opt.name,
                    label: opt.name,
                  }))}
                  //options={options}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Title
          </label>
          <input
            disabled={isLoading}
            className="appearance-none block w-full bg-gray-200 dark:bg-slate-700 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:dark:bg-slate-700"
            data-test="title-input"
            {...register("title", { required: true })}
            type="text"
            placeholder="My Recipe title"
          />
          <p className="text-red-500 text-xs italic">
            {errors.title && (
              <span data-test="title-error">Title is required</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-3 ">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Author
          </label>
          <input
            disabled={isLoading}
            value={session?.user?.name}
            className="appearance-none block dark:bg-slate-700 dark:text-white w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:dark:bg-slate-700"
            data-test="author_id-input"
            {...register("author_id", { required: true })}
            type="text"
            placeholder="Author name"
          />
          <p className="text-red-500 text-xs italic">
            {errors.author_id && (
              <span data-test="author_id-error">Author is required</span>
            )}
          </p>
        </div>
      </div>
      <div className="container flex justify-center -mx-3 mb-3 ">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Course
          </label>
          <div data-test="course-input" className="relative">
            <Controller
              name="category.course"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  isDisabled={isLoading}
                  className="w-full py-2 my-react-select-container"
                  classNamePrefix="my-react-select"
                  styles={styles}
                  defaultValue={{
                    label: props?.values?.category?.course,
                    value: props?.values?.category?.course,
                  }}
                  options={course.map((opt) => ({
                    value: opt.name,
                    label: opt.name,
                  }))}
                  onChange={(val) => onChange(val.value)}
                />
              )}
              rules={{ required: true }}
            />
            <p className="text-red-500 text-xs italic">
              {errors.category && (
                <span data-test="course-error">Course is required</span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Country
          </label>
          <div data-test="country-input" className="relative">
            <Controller
              name="category.country"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  isDisabled={isLoading}
                  className="w-full py-2 my-react-select-container"
                  classNamePrefix="my-react-select"
                  styles={styles}
                  defaultValue={{
                    label: props?.values?.category?.country,
                    value: props?.values?.category?.country,
                  }}
                  options={countryNames.map((opt) => ({
                    value: opt.name,
                    label: opt.name,
                  }))}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Diet
          </label>
          <div data-test="diet-input" className="relative">
            <Controller
              name="category.diet"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  isDisabled={isLoading}
                  className="w-full py-2 my-react-select-container"
                  classNamePrefix="my-react-select"
                  styles={styles}
                  defaultValue={{
                    label: props?.values?.category?.diet,
                    value: props?.values?.category?.diet,
                  }}
                  options={diet.map((opt) => ({
                    value: opt.name,
                    label: opt.name,
                  }))}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
          </div>
        </div>
      </div>
      {iterationList.map((singleIteration, i) => (
        <div key={i}>
          <div className="container flex justify-center -mx-3 mb-3">
            <div className="w-full md:w-3/5 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
                Ingredient
              </label>
              <div className="relative">
                <input
                  disabled={isLoading}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:dark:bg-slate-700"
                  data-test={`ingredient-input${i}`}
                  {...register(`ingredients.${i}.name`, { required: true })}
                  type="text"
                  placeholder={"Ingredient " + `${i + 1}`}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.ingredients && (
                    <span data-test="ingredient-error">
                      Ingredient is required
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
                Amount
              </label>
              <div className="relative">
                <input
                  disabled={isLoading}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:dark:bg-slate-700"
                  data-test={`amount-input${i}`}
                  {...register(`ingredients.${i}.amount`, { required: true })}
                  type="number"
                  placeholder={"Amount " + `${i + 1}`}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.ingredients && (
                    <span data-test="amount-error">Amount is required</span>
                  )}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2">
                Unit
              </label>
              <div data-test={`unit-input${i}`} className="relative">
                <Controller
                  name={`ingredients.${i}.unit`}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Select
                      isDisabled={isLoading}
                      className="w-full py-2 my-react-select-container"
                      classNamePrefix="my-react-select"
                      styles={styles}
                      defaultValue={{
                        label: props?.values?.ingredients[i]?.unit,
                        value: props?.values?.ingredients[i]?.unit,
                      }}
                      options={unit.map((opt) => ({
                        value: opt.name,
                        label: opt.name,
                      }))}
                      onChange={(val) => onChange(val.value)}
                    />
                  )}
                  rules={{ required: true }}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.ingredients && (
                    <span data-test="unit-error">Unit is required</span>
                  )}
                </p>
              </div>
            </div>
            {iterationList.length !== 1 && (
              <button
                data-test={`remove-ingredient-button${i}`}
                type="button"
                onClick={() => handleIterationRemove(i)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 my-5 mt-8 rounded"
              >
                <span>X</span>
              </button>
            )}
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            {iterationList.length - 1 === i && (
              <button
                data-test="add-ingredient-button"
                type="button"
                onClick={handleIterationAdd}
                className="bg-green-500 hover:bg-green-700 dark:bg-slate-700 dark:text-white text-white font-bold py-1 px-3 mb-5 rounded"
              >
                <span>+</span>
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap -mx-3 mb-3 ">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide dark:text-white text-gray-700 text-xs font-bold mb-2">
            Steps
          </label>
          <textarea
            disabled={isLoading}
            className="appearance-none block w-full bg-gray-200 dark:bg-slate-700 dark:text-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:dark:bg-slate-700"
            data-test="steps-input"
            {...register("steps", { required: true })}
            placeholder="My Recipe steps"
            cols={20}
            rows={10}
          />
          <p className="text-red-500 text-xs italic">
            {errors.steps && (
              <span data-test="steps-error">Please provide method</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col align-middle  space-y-2">
        {JSON.stringify(image)}
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
        <a
          className="mx-auto border-4 fill gray-outline-button cursor-pointer"
          onClick={handleImageUpload}
        >
          <CloudArrowUpIcon className="h-20 w-20" /> Add Image
        </a>
      </div>
      <button
        disabled={isLoading}
        data-test="submit-button"
        type="submit"
        className="bg-green-500 dark:bg-slate-700 dark:text-white hover:bg-green-700 text-white font-bold py-3 px-8 mb-5 rounded"
      >
        {label || "Add Recipe"}
      </button>
    </form>
  );
}
