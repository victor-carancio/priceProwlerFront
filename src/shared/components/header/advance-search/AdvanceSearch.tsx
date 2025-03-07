import React, { useState } from "react";

import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetGenresQuery,
} from "../../../../store/apis/gameApi";
import { StyledIcon } from "../../logo/logo";
import CustomSelect from "../../select/CustomSelect";
import { sortOptions } from "../../../../utils";
import CustomBtn from "../../custom-btn/CustomBtn";

import {
  AdvanceSearchContainer,
  AdvanceSearchOverlay,
  CloseOverlay,
} from "./AdvanceSearch.styles";

interface AdvanceSearchProps {
  openSearch: boolean;
  isAdvanceSearch: boolean;
  advanceSearchToggle: () => void;
}

const AdvanceSearch = ({
  advanceSearchToggle,
  isAdvanceSearch,
  openSearch,
}: AdvanceSearchProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    genre: "",
    category: "",
    sort: "",
  });

  const {
    data: categoryData,
    // error: categoryError,
    isLoading: categoryLoading,
  } = useGetCategoriesQuery("");
  const {
    data: genreData,
    // error: genreError,
    isLoading: genreLoading,
  } = useGetGenresQuery("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event?.preventDefault();

    if (filters.category || filters.genre) {
      const params = new URLSearchParams();

      if (filters.genre) {
        params.append("genre", filters.genre);
      }
      if (filters.category) {
        params.append("category", filters.category);
      }
      if (filters.sort) {
        const sortCorrect = filters.sort.split("-");
        params.append("sort", sortCorrect[0]);
        params.append("order", sortCorrect[1]);
      }

      const url = `/filters-results?${params.toString()}`;

      navigate(url);
      setFilters({ category: "", genre: "", sort: "" });
    }
  };
  if (categoryLoading || genreLoading) {
    return (
      <AdvanceSearchOverlay
        $isOpen={openSearch}
        $isAdvanceSearch={isAdvanceSearch}
      >
        Cargando...
      </AdvanceSearchOverlay>
    );
  }
  return (
    <AdvanceSearchOverlay
      $isOpen={openSearch}
      $isAdvanceSearch={isAdvanceSearch}
      onClick={advanceSearchToggle}
    >
      <AdvanceSearchContainer
        onSubmit={handleSubmit}
        onClick={(e: React.MouseEvent<HTMLFormElement>) => e.stopPropagation()}
      >
        <CloseOverlay onClick={advanceSearchToggle}>
          <StyledIcon>
            <IoClose />
          </StyledIcon>
        </CloseOverlay>
        <CustomSelect
          name="genre"
          options={
            genreData?.genres.length && !genreLoading
              ? [
                  { label: "Géneros", value: "" },
                  ...getSelectFilter(genreData.genres),
                ]
              : [{ label: "Cargando...", value: "" }]
          }
          onChange={handleSelectChange}
          value={filters.genre}
        />

        <CustomSelect
          name="category"
          options={
            categoryData?.categories.length && !categoryLoading
              ? [
                  { label: "Categorías", value: "" },
                  ...getSelectFilter(categoryData.categories),
                ]
              : [{ label: "Cargando...", value: "" }]
          }
          onChange={handleSelectChange}
          value={filters.category}
        />

        <CustomSelect
          name="sort"
          options={[{ label: "Ordenar por", value: "" }, ...sortOptions]}
          value={filters.sort}
          onChange={handleSelectChange}
          // placeholder="ordenar por"
        />

        <CustomBtn
          aria="search-button"
          text="Buscar"
          size="18px"
          onClick={handleSubmit}
        />
      </AdvanceSearchContainer>
    </AdvanceSearchOverlay>
  );
};

export default AdvanceSearch;

const getSelectFilter = (filters: string[]) => {
  return filters.map((filter) => ({ label: filter, value: filter }));
};
