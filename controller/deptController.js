const db = require("../model/db");

const Dept = db.depts;

const addDept = async (req, res) => {
  try {
    let info = {
      deptName: req.body.deptName,
    };

    const dept = await Dept.create(info);
    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the department.",
    });
  }
};

const getDeptData = async (req, res) => {
  try {
    let dept = await Dept.findAll({});
    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving department data.",
    });
  }
};

const getOneDept = async (req, res) => {
  try {
    let id = req.query.id;
    let dept = await Dept.findOne({ where: { id: id } });
    if (dept) {
      res.status(200).send(dept);
    } else {
      res.status(404).send({
        message: `Cannot find department with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Error retrieving department with the specified ID.",
    });
  }
};

const updateDept = async (req, res) => {
  try {
    let id = req.query.id;
    const [numRowsAffected, updatedDept] = await Dept.update(req.body, {
      where: { id: id },
    });
    if (numRowsAffected === 1) {
      res.status(200).send({
        message: "Department was updated successfully.",
        updatedDept,
      });
    } else {
      res.status(404).send({
        message: `Cannot update department with id=${id}. Maybe department was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Error updating department with the specified ID.",
    });
  }
};

const deleteDept = async (req, res) => {
  try {
    let id = req.query.id;
    const numRowsAffected = await Dept.destroy({ where: { id: id } });
    if (numRowsAffected === 1) {
      res.status(200).send({message: "Department was deleted successfully!"});
    } else {
      res.status(404).send({
        message: `Cannot delete department with id=${id}. Maybe department was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Could not delete department with the specified ID.",
    });
  }
};

module.exports = {
  addDept,
  getDeptData,
  getOneDept,
  updateDept,
  deleteDept,
};
