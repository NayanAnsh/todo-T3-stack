import React from "react";

const MenuButton = ({
  label,
  children,
}: {
  label?: string;
  children?: React.ReactNode;
}) => {
  console.log("-----------");
  console.log(label);
  return (
    <div className="hover:bg-gray-400 text-black border text-center  px-4 py-2 w-10/12 rounded">
      {label ? label : <div className="flex justify-center">{children}</div>}
    </div>
  );
};

export default MenuButton;
