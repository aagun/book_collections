function thicknessOfBook(totalPage) {
  if (totalPage > 200) {
    return 'tebal';
  }

  if (totalPage > 100 && totalPage < 201) {
    return 'sedang';
  }

  return 'tipis';
}

module.exports = {thicknessOfBook}