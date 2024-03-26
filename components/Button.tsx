import React from "react";

const Button = ({
  label,
  children,
  ...props
}: {
  label?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="  hover:bg-gray-400 text-black border text-center   w-10/12 font-bold py-2 p rounded" {...props} >
      {label ? label : <div className="flex justify-center">{children}</div>}
    </div>
  );
};

export default Button;
