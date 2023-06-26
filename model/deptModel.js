module.exports = (sequelize, DataTypes) => {
  const Dept = sequelize.define("dept", {
    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Dept;
};
