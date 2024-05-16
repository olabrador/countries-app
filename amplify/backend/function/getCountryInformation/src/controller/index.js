const connectToDB = require("../db");
const { isValidPagination } = require("../utils");

async function getCountryInformation(req, res, next) {
  const { page = 1, rows = 10 } = req.query;
  if (!isValidPagination(page, rows)) {
    return res.status(400).json({ error: "Invalid page or rows value" });
  }
  const dbClient = await connectToDB();

  try {
    const offset = (page - 1) * rows;

    const totalResult = await dbClient.query("SELECT COUNT(*) FROM countries");
    const totalRegisters = parseInt(totalResult.rows[0].count, 10);

    const result = await dbClient.query(
      "SELECT * FROM countries ORDER BY country_name ASC LIMIT $1 OFFSET $2",
      [rows, offset]
    );

    const queryDate = new Date();
    const date_added = `${
      queryDate.getMonth() + 1
    }-${queryDate.getDate()}-${queryDate.getFullYear()}`;
    const data = result.rows.map((row) => ({
      id: row.id,
      country_name: row.country_name,
      performance_oriented: row.performance_oriented,
      autocratic: row.autocratic,
      modesty: row.modesty,
      country_cluster: row.country_cluster,
      charisma: row.charisma,
      decisive: row.decisive,
      date_added,
    }));

    res.json({
      metadata: {
        page: parseInt(page, 10),
        rows: parseInt(rows, 10),
        total_registers: totalRegisters,
      },
      data,
    });
  } catch (error) {
    console.error("Error fetching countries", error);
    next(error);
  }
}

module.exports = {
  getCountryInformation,
};
