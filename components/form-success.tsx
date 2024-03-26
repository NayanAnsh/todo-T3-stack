import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <ExclamationTriangleIcon className="h-2 w-2" />
      <p>{message}</p>
    </div>
  );
};
