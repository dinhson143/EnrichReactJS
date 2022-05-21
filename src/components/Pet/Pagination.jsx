import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({
  currentPage,
  numberOfPets,
  handleClick,
}) {
  const handleClickPage = (event) => {
    let page = 1;
    if (event.target.dataset.testid === "NavigateNextIcon") {
      page = currentPage < numberOfPets ? currentPage + 1 : page;
    } else if (event.target.dataset.testid === "NavigateBeforeIcon") {
      page = currentPage > 1 ? currentPage - 1 : page;
    } else {
      page = parseInt(event.target.textContent);
    }
    handleClick(page);
  };
  return (
    <Stack spacing={1}>
      <Pagination
        onClick={handleClickPage}
        count={numberOfPets}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
