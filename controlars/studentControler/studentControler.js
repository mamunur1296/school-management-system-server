const getStudents = (req, res, next) => {
  res.json({
    data: "student route",
  });
};

module.exports = {
  getStudents,
};
