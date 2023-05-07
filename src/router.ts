import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  allEmployees,
  createEmployee,
  deleteEmployee,
} from "./handlers/employee";
import { createAbsence, getabsence } from "./handlers/absence";
const router = Router();

router.get("/", (req, res) => {
  console.log("hello from express");

  res.status(200);
  res.json({ message: "hello" });
});
//to call all the empolyees
router.get("/empoloyees", allEmployees);
//to create an employee
router.post(
  "/empoloyees",
  body("name").isString(),
  body("lastname").isString(),
  body("email").isEmail(),

  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hi from fields");
      return res.status(400).json({ errors: errors.array() });
    }
    createEmployee(req, res);
  }
);
//to delete an employee

router.delete("/empoloyee/:id", deleteEmployee);
////////////////////////////////////////////////////////////////
//now we will work at the absence
router.get("/absence", getabsence);
router.post("/absence/:employeeId", createAbsence);
export default router;
