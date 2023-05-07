import prisma from "../db";
export const oneEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting employee" });
  }
};
export const allEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting employees" });
  }
};
// POST create a new employee
export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: req.body.name,
        lastName: req.body.lastname,
        email: req.body.email,
      },
    });
    res.json(newEmployee);
    console.log("great scc");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating employee" });
  }
};
//deleting an employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the employee
    const deletedEmployee = await prisma.employee.delete({
      where: {
        id: id,
      },
      include: {
        absences: true,
        clinicalEvidence: true,
      },
    });

    // Delete associated absences
    await prisma.absence.deleteMany({
      where: {
        employeeId: id,
      },
    });

    // Delete associated clinical data
    await prisma.clinicalEvidence.deleteMany({
      where: {
        employeeId: id,
      },
    });

    res.json(deletedEmployee);
    console.log("Employee and associated records deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting employee" });
  }
};
