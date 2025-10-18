import * as React from "react";
export default function Send(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 12L19 5L16 19L12 14L5 12Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}