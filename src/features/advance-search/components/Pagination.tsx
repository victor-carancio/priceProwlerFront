import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { StyledIcon } from "../../../shared/components/logo/logo";
import {
  CurrentPage,
  PaginationContainer,
  PaginationNumber,
} from "./Pagination.styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  clickPage: (page: number) => void;
}
const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  clickPage,
}: PaginationProps) => {
  const prevThreeNum = Array.from(
    { length: 3 },
    (_, index) => currentPage - 1 - index
  )
    .filter((value) => value > 0)
    .reverse();

  const nextThreeNum = Array.from(
    { length: 3 },
    (_, index) => currentPage + index
  ).filter((value) => value <= totalPages);
  const pagination = [...prevThreeNum, ...nextThreeNum];

  return (
    <PaginationContainer>
      {currentPage > 1 && (
        <StyledIcon>
          <GrFormPrevious onClick={prevPage} data-testid="prev-icon" />
        </StyledIcon>
      )}

      {pagination.map((page) => {
        return page === currentPage ? (
          <CurrentPage key={page}>{page}</CurrentPage>
        ) : (
          <PaginationNumber key={page} onClick={() => clickPage(page)}>
            {page}
          </PaginationNumber>
        );
      })}

      {totalPages !== currentPage && (
        <StyledIcon>
          <GrFormNext onClick={nextPage} data-testid="next-icon" />
        </StyledIcon>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
