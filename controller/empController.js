const db = require("../model/db");

const Employee = db.employees;
const Dept = db.depts;

const addEmployee = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      deptIDFK: req.body.deptIDFK,
    };

    const employee = await Employee.create(info);
    res.status(200).send(employee);
    console.log(employee);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding the employee.",
    });
  }
};

const getEmployeeData = async (req, res) => {
  try {
    let employee = await Employee.findAll({});
    res.status(200).send(employee);
    console.log(employee);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving employee data.",
    });
  }
};

const getOneEmployee = async (req, res) => {
  try {
    let id = req.query.id;
    let employee = await Employee.findOne({ where: { id: id } });
    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send({
        message: `Cannot find employee with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving employee with the specified ID.",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    let id = req.query.id;
    const [numRowsAffected, updatedEmployee] = await Employee.update(req.body, { where: { id: id } });
    if (numRowsAffected === 1) {
      res.status(200).send({
        message: "Employee was updated successfully.",
        updatedEmployee,
      });
    } else {
      res.status(404).send({
        message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating employee with the specified ID.",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    let id = req.query.id;
    const numRowsAffected = await Employee.destroy({ where: { id: id } });
    if (numRowsAffected === 1) {
      res.status(200).send({message: "Employee was deleted successfully!"});
    } else {
      res.status(404).send({
        message: `Cannot delete employee with id=${id}. Maybe employee was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete employee with the specified ID.",
    });
  }
};

const getDeptEmp = async (req, res) => {
  try {
    const id = req.query.id;

    const data = await Employee.findAll({
      include: [
        {
          model: Dept,
          as: "dept",
        },
      ],
      where: { deptIDFK: id },
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving department employees.",
    });
  }
};

module.exports = {
  addEmployee,
  getEmployeeData,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
  getDeptEmp,
};
