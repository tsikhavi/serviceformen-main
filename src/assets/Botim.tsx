interface IBotimProps {
  isGray: boolean;
}

export const Botim: React.FC<IBotimProps> = ({ isGray }) => {
  return (
    <svg
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.39"
    >
      <path
        d="M27.4,0H95.48a27.48,27.48,0,0,1,27.4,27.4V95a27.48,27.48,0,0,1-27.4,27.41H27.4A27.48,27.48,0,0,1,0,95V27.4A27.48,27.48,0,0,1,27.4,0Z"
        fill={!isGray ? "#10b7f4" : "#E1E2E7"}
      />
      <path
        d="M37.07,32.34A14.41,14.41,0,1,1,22.66,46.75,14.41,14.41,0,0,1,37.07,32.34Z"
        fill="#FFFFFF"
      />
      <path
        d="M85.74,32.34A14.41,14.41,0,1,1,71.33,46.75,14.41,14.41,0,0,1,85.74,32.34Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};
