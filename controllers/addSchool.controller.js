const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addSchoolController = async (req, res) => {
  try {
    // Extract fields directly from req.body
    const { name, address, latitude, longitude } = req.body;
    const data = {
      name,
      address,
      latitude,
      longitude,
    };
    console.log("Data Received: ", data);

    if (
      !name ||
      !address ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Insert into MySQL using Prisma
    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });

    res
      .status(201)
      .json({ message: "School added successfully!", school: newSchool });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ error: "Failed to add school!" });
  }
};

module.exports = { addSchoolController };
