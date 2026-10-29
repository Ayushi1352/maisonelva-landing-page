import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Line icons (24px grid, current colour); size them with className */
function Icon({ children, strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Close = (props: IconProps) => <Icon {...props}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
export const Menu = (props: IconProps) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h10" /></Icon>;
export const ArrowRight = (props: IconProps) => <Icon {...props}><path d="M4 12h16m-6-6 6 6-6 6" /></Icon>;
export const ChevronLeft = (props: IconProps) => <Icon strokeWidth={1.8} {...props}><path d="M15 5l-7 7 7 7" /></Icon>;
export const ChevronRight = (props: IconProps) => <Icon strokeWidth={1.8} {...props}><path d="M9 5l7 7-7 7" /></Icon>;
export const ChevronDown = (props: IconProps) => <Icon strokeWidth={2} {...props}><path d="M6 9l6 6 6-6" /></Icon>;
export const Check = (props: IconProps) => <Icon strokeWidth={2.4} {...props}><path d="m5 12.5 4.5 4.5L19 7.5" /></Icon>;
export const MapPin = (props: IconProps) => <Icon {...props}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></Icon>;
export const Phone = (props: IconProps) => <Icon {...props}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Icon>;
export const Mail = (props: IconProps) => <Icon {...props}><path d="M3 6h18v12H3V6Zm0 0 9 7 9-7" /></Icon>;
export const Instagram = (props: IconProps) => (
  <Icon {...props}><path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.25-1.5h.01" /></Icon>
);
export const Facebook = (props: IconProps) => (
  <Icon {...props}><path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9a1 1 0 0 1 1-1Z" /></Icon>
);
export const LinkedIn = (props: IconProps) => (
  <Icon {...props}><path d="M4 4h16v16H4V4Zm4 6.5V16m0-8.5v.01M12 16v-5.5m0 2.25A2.25 2.25 0 0 1 14.25 10.5 1.75 1.75 0 0 1 16 12.25V16" /></Icon>
);
