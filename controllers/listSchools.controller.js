const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listSchoolsController = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "User location (latitude & longitude) is required." });
  }

  try {
    const schools = await prisma.school.findMany();

    // Function to calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (deg) => (deg * Math.PI) / 180;
      const R = 6371; // Earth's radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
    };

    // Sort schools by proximity
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

module.exports = {
  listSchoolsController,
};
