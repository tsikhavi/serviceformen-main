interface IArrowDownProps {
  fill: string;
}

export const ArrowDown: React.FC<IArrowDownProps> = ({ fill }) => {
  return (
    <svg
      fill={fill}
      width="800px"
      height="800px"
      viewBox="-108 108 512 512"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#1B1B1B"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
      </g>
    </svg>
  );
};
