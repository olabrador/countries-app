const { isValidPagination } = require('./index');

describe('isValidPagination', () => {
  it('should return true if page or rows are valid transformed integers', () => {
    expect(isValidPagination('1', 1)).toBe(true);
    expect(isValidPagination(1, '1')).toBe(true);
  });

  it('should return false if page or rows are less than 1', () => {
    expect(isValidPagination(0, 1)).toBe(false);
    expect(isValidPagination(1, 0)).toBe(false);
  });

  it('should return true if page and rows are integers and greater than or equal to 1', () => {
    expect(isValidPagination(1, 1)).toBe(true);
  });
});