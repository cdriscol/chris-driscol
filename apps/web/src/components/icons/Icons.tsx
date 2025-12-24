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

export const IconGitHub = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className ? `${className} block` : defaultIconClassName}
  >
    <path
      fill="currentColor"
      d="M12 .5C5.73.5.75 5.58.75 11.98c0 5.2 3.43 9.6 8.2 11.16.6.12.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.74-4.04-1.66-4.04-1.66-.54-1.4-1.32-1.77-1.32-1.77-1.08-.76.08-.74.08-.74 1.2.09 1.83 1.26 1.83 1.26 1.06 1.86 2.78 1.32 3.46 1 .11-.8.41-1.32.74-1.62-2.66-.31-5.46-1.36-5.46-6.03 0-1.33.46-2.41 1.22-3.26-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.24a11.2 11.2 0 0 1 6 0c2.3-1.57 3.3-1.24 3.3-1.24.65 1.69.24 2.94.12 3.25.76.85 1.22 1.93 1.22 3.26 0 4.68-2.8 5.72-5.48 6.02.42.37.8 1.1.8 2.23 0 1.61-.02 2.9-.02 3.3 0 .32.22.7.83.58 4.76-1.56 8.19-5.96 8.19-11.16C23.25 5.58 18.27.5 12 .5z"
    />
  </svg>
);

export const IconHeart = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1em] w-[1em] text-current align-[-0.1em] m-[0 6px]">
    <path
      fill="currentColor"
      d="M12 21s-6.5-4.35-9.3-7.95C.9 11.2 1.3 7.7 4.1 6.1c2.1-1.2 4.6-.6 5.9 1.2 1.3-1.8 3.8-2.4 5.9-1.2 2.8 1.6 3.2 5.1 1.4 7-2.8 3.6-9.3 7.9-9.3 7.9z"
    />
  </svg>
);
