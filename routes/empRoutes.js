const empController = require("../controller/empController.js");
const deptController = require("../controller/deptController");
const router = require("express").Router();

//Department Routes
router.get("/getDept", deptController.getDeptData); //Get All Departments
router.get("/getOneDept", deptController.getOneDept); //Get One Department
router.post("/addDept", deptController.addDept); //Add One Department
router.put("/updateDept", deptController.updateDept); //Update One Department
router.delete("/deleteDept", deptController.deleteDept); //Delete One Department

//Employee Routes
router.get("/getEmp", empController.getEmployeeData); //Get All Employees
router.get("/getOneEmp", empController.getOneEmployee); //get One Employee
router.post("/addEmp", empController.addEmployee); //Add One Employee
router.put("/updateEmp", empController.updateEmployee); //Update One Employee
router.delete("/deleteEmp", empController.deleteEmployee); //Delete One Employee
router.get("/getDeptEmp", empController.getDeptEmp); //Get Department Wise Employee

module.exports = router;
