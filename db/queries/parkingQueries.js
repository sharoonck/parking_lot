const createConnection = require("../conn");

const queryDb = (query, data) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.connect();
    connection.query(query, data, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
};

const insertParkedVehicle = `
INSERT INTO parked_vehicles SET ?
`;

const updateParkedVehicle = `
UPDATE parked_vehicles SET is_parked = ? WHERE slot_number = ?
`;

const selectParkedVehicles = `
SELECT * FROM parked_vehicles
`;

const selectParkedVehicleByRegistrationNumber = `
SELECT * FROM parked_vehicles WHERE registration_number = ?
`;

const selectParkedVehicleBySlotNumber = `
SELECT * FROM parked_vehicles WHERE slot_number = ?
`;

const selectAvailableSlots = `
SELECT slot_number FROM parked_vehicles WHERE is_parked = false
`;

module.exports = {
  queryDb,
  insertParkedVehicle,
  updateParkedVehicle,
  selectParkedVehicles,
  selectParkedVehicleByRegistrationNumber,
  selectParkedVehicleBySlotNumber,
  selectAvailableSlots
};
