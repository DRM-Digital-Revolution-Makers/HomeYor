import * as React from "react";
export default function RightArrow(props: React.SVGProps<SVGAElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
    >
      <path
        d="M1 1L7 8L1 15"
        stroke="#1E90FF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
