import type { FC } from "react";

interface Props {
  text: string;
  name?: string;
  designs?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  fn?: () => void;
}

const Button: FC<Props> = ({ text, name, designs, disabled, type, fn }) => {
  return (
    <button
      type={type}
      name={name}
      className={`custom-btn ${designs}`}
      disabled={disabled}
      onClick={fn}
    >
      {text}
    </button>
  );
};

export default Button;
