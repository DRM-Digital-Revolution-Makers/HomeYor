import * as React from "react";
export default function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <path d="M25 8.75H5" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 15H5" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 21.25H5" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}