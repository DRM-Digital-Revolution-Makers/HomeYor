import * as React from "react";
export default function RightArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
      {...props}
    >
      <path
        d="M1 1L7 8L1 15"
        stroke="#1E90FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
