import { Plus } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface HeadingContainerInterface {
  title: string;
  subtitle: string;
  callback?: () => void;
  buttonText?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}
const HeadingContainer = ({
  title = "Unkown Heading",
  subtitle = "Unkown Subtitle",
  callback,
  buttonText,
  buttonProps,
}: HeadingContainerInterface) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        <h6 className="text-sm text-gray-600">{subtitle}</h6>
      </div>
      {buttonText && (
        <button
          onClick={callback}
          {...buttonProps}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main-text hover:bg-main-text/90 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-bg"
        >
          <Plus className="h-4 w-4 mr-2" />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default HeadingContainer;
