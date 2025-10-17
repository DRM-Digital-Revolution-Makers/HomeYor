import * as React from "react";
export default function LeftArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <path
        opacity="0.5"
        d="M25 15.9375C25.5177 15.9375 25.9375 15.5178 25.9375 15C25.9375 14.4822 25.5177 14.0625 25 14.0625V15.9375ZM25 14.0625H5V15.9375H25V14.0625Z"
        fill="#1E90FF"
      />
      <path
        d="M12.5 7.5L5 15L12.5 22.5"
        stroke="#1E90FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
