import * as React from "react";
export default function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 6L15 12L9 18" stroke="#111" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}