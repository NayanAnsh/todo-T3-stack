import * as React from "react"
const PlaySvgComponent = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
   
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle fill="#ff5349" cx={12} cy={12} r={10} stroke="#1C274C" strokeWidth={1} />
    <path
      stroke="#1C274C"
      fill="#fff"
      strokeWidth={1}
      d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787Z"
    />
  </svg>
)
export default PlaySvgComponent
