import prisma from "../db";

export const getabsence = async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      absences: true,
    },
  });

  res.json({ data: employee.absences });
};
export const createAbsence = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    // Create the absence record associated with the employee
    const newAbsence = await prisma.absence.create({
      data: {
        startDate,
        endDate,
        reason,
        employee: {
          connect: {
            id: req.params.employeeId,
          },
        },
      },
    });

    res.json(newAbsence);
    console.log("New absence record created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating absence record" });
  }
};
