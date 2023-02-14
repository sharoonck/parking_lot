
const getNearestParkingSlot = async () => {
  const parkingData = await queryDb("SELECT * FROM parked_vehicles");
  // Initialize the nearest slot with 1
  let nearestSlot = 1;
  // Loop through the parked vehicles to find the nearest available slot
  for (let i = 1; i <= parkingData.length; i++) {
    // Find a parked vehicle with the current slot number
    const parkedVehicle = parkingData.find(
      (vehicle) => vehicle.slot_number === i
    );
    // If no parked vehicle is found for the current slot number,
    // assign the current slot number to the nearestSlot variable
    // and break the loop
    if (!parkedVehicle) {
      nearestSlot = i;
      break;
    }
  }
  
  return nearestSlot;
};


const checkIfParkingFull = async () => {
  // Get the data of all parked vehicles
  const parkingData = await queryDb("SELECT * FROM parked_vehicles");
  // Return true if the number of parked vehicles is equal to the total number of parking slots
  // Return false otherwise
  return parkingData.length === PARKING_SLOTS;
};


module.exports = {
  checkIfParkingFull,
  getNearestParkingSlot
};
