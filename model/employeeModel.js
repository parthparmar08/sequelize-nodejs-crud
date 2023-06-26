module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deptIDFK: {
      type: DataTypes.INTEGER,
    },
  });

  return Employee;
};
