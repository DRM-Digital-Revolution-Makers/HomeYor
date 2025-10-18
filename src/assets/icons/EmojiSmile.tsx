import * as React from "react";
export default function EmojiSmile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={9} stroke="#6b7280" strokeWidth={1.6} />
      <circle cx={9} cy={10} r={1} fill="#6b7280" />
      <circle cx={15} cy={10} r={1} fill="#6b7280" />
      <path d="M8 14C9 15.5 10.5 16.25 12 16.25C13.5 16.25 15 15.5 16 14" stroke="#6b7280" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}