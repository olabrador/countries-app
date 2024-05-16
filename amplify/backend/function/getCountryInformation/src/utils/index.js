function isValidPagination(page, rows) {
  const pageNumber = Number(page);
  const rowsNumber = Number(rows);
  return Number.isInteger(pageNumber) && Number.isInteger(rowsNumber) && pageNumber > 0 && rowsNumber > 0;
}

module.exports = {
  isValidPagination,
};
