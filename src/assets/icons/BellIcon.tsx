import * as React from "react";
export default function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      {...props}
    >
      <path
        d="M23.9364 12.137V11.2562C23.9364 6.42029 20.1593 2.5 15.5 2.5C10.8407 2.5 7.06359 6.42029 7.06359 11.2562V12.137C7.06359 13.194 6.76215 14.2272 6.19725 15.1067L4.81295 17.2619C3.54853 19.2304 4.51381 21.9061 6.71295 22.5286C12.4659 24.1571 18.5341 24.1571 24.287 22.5286C26.4863 21.9061 27.4515 19.2304 26.187 17.2619L24.8027 15.1067C24.2379 14.2272 23.9364 13.194 23.9364 12.137Z"
        stroke="#676767"
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M9.875 23.75C10.6938 25.9347 12.9031 27.5 15.5 27.5C18.0969 27.5 20.3063 25.9347 21.125 23.75"
        stroke="#676767"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}