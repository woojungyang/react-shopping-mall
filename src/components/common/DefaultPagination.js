import React from "react";

import { Pagination, Stack } from "@mui/material";

export const DefaultPagination = ({ count, page, handleChangePage }) => {
  return (
    <Stack alignItems="center" sx={{ marginTop: "20px" }}>
      <Pagination count={count} page={page} onChange={handleChangePage} />
    </Stack>
  );
};
