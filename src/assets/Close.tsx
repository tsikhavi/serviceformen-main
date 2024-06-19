interface ICloseProps {
  fill: string;
}

export const Close: React.FC<ICloseProps> = ({ fill }) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={fill}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 21.32L21 3.32001"
          stroke={fill}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
        <path
          d="M3 3.32001L21 21.32"
          stroke={fill}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{" "}
      </g>
    </svg>
  );
};
