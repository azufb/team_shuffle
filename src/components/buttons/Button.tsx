type ButtonTypes = "button" | "submit" | "reset" | undefined;

type PropsType = {
  onClick: () => void;
  children?: JSX.Element;
  className?: string;
  type?: ButtonTypes;
};

export const Button = ({
  onClick,
  children,
  className,
  type = "button",
}: PropsType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex gap-2 justify-center items-center rounded-md p-2 text-white ${className}`}
    >
      {children}
    </button>
  );
};
