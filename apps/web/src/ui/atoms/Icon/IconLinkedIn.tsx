type IconProps = {
  className?: string;
};

const defaultIconClassName = "h-[20px] w-[20px] block";

export const IconLinkedIn = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className ? `${className} block` : defaultIconClassName}
  >
    <path
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5zM.5 8h3.98v12.5H.5V8zm7.5 0h3.82v1.7h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.05V20.5h-3.98v-5.9c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13v6H8V8z"
    />
  </svg>
);
