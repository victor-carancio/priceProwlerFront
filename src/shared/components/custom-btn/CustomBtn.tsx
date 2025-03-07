import { StyledStoreIcon } from "../logo/logo";
import React from "react";
import { Button } from "./CustomBtn.styles";

interface CustomBtnProps {
  aria?: string;
  text: string;
  icon?: JSX.Element;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void; //| () => void;
  // onSubmit?: () => React.;
}

const CustomBtn = ({ aria, text, icon, size, onClick }: CustomBtnProps) => {
  return (
    <Button
      data-testid={aria ? aria : ""}
      $size={size}
      onClick={onClick ? onClick : undefined}
    >
      <StyledStoreIcon size={size ? size : "18"}>
        {icon && icon}
      </StyledStoreIcon>
      <p>{text}</p>
    </Button>
  );
};

export default CustomBtn;
