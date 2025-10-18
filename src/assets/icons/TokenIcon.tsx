import * as React from "react";
export default function TokenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="#1E90FF" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.5" stroke="#1E90FF" strokeWidth="1.5" opacity="0.8" />
      <path d="M9 12H15" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}