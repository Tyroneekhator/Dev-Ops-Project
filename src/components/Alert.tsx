import { useState } from "react";

interface AlertProps {
  label: string;
  variant: "success" | "warning";
  fade?: boolean;
}
export default function Alert(props: AlertProps) {
  const { label, variant, fade } = props;

  const [startFade, setStartFade] = useState(false);

  if (fade) {
    setTimeout(() => {
      setStartFade(true);
    }, 4000);
  }

  return (
    <div
      className={`
     
      ${startFade ? "transition-all  duration-1000 ease-out  hidden" : ""}
      ${variant === "warning"
          ? "bg-red-100 border-red-400 text-red-700 "
          : "bg-green-100 border-green-400 text-green-700 "
        } 
      mt-5
      mb-5  
      border 
      px-4 py-3 rounded relative`}
      role="alert"
    >
      <strong className="font-bold">{label}</strong>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={() => setStartFade(true)}
      >
        <svg
          className={`fill-current h-6 w-6 cursor-pointer
          ${variant === "warning" ? "text-red-500" : "text-green-500"} 
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20`}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
}
