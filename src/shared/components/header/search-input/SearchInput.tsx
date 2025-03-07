import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledIcon } from "../../logo/logo";
import {
  Input,
  InputContainer,
  InputLogoContainer,
} from "./SearchInput.styles";

interface SearchInputProps {
  onClick: () => void;
}

const SearchInput = ({ onClick }: SearchInputProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gameName: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>
  ) => {
    event.preventDefault();

    if (formData.gameName !== "") {
      navigate(`/results?search=${encodeURIComponent(formData.gameName)}`);
      setFormData({ ...formData, gameName: "" });
    }
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        name="gameName"
        value={formData.gameName}
        onChange={handleChange}
        className="search-input"
        placeholder="Buscar videojuego..."
        autoComplete="off"
        aria-label="Buscar videojuego"
      />

      <InputLogoContainer>
        <StyledIcon>
          <IoFilterSharp onClick={onClick} aria-label="filter-icon" />
        </StyledIcon>
        <StyledIcon className="input-logo">
          <IoIosSearch onClick={handleSubmit} aria-label="search-icon" />
        </StyledIcon>
      </InputLogoContainer>
    </InputContainer>
  );
};

export default SearchInput;
