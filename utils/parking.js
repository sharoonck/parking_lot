const {
    getNearestParkingSlot,
    checkIfParkingFull
} = require("./util");
const queryDb = require("../db/conn").queryDb;

// Function to create a parking lot
const createParkingLot = async slots => {
    try {
        // Check if a parking lot is already created
        const parkingData = await queryDb("SELECT * FROM parking_lot");
        if (parkingData.length > 0) {
            console.log("Parking lot already created");
            return;
        }
        // Create a new parking lot with the given number of slots
        await queryDb(`INSERT INTO parking_lot(slots) VALUES (${slots})`);
        console.log(`Created a parking lot with ${slots} slots`);
    } catch (error) {
        console.log("Error creating parking lot");
        console.error(error);
    }
};

// Function to park a vehicle
const parkVehicle = async (registrationNumber, vehicleType) => {
    try {
        // Check if parking lot is created
        const parkingData = await queryDb("SELECT * FROM parking_lot");
        if (parkingData.length === 0) {
            console.log("Create parking lot first");
            return;
        }
        // Check if parking lot is full
        if (checkIfParkingFull(parkingData[0].slots)) {
            console.log("Sorry, parking lot is full");
            return;
        }
        // Get the nearest parking slot
        const nearestSlot = getNearestParkingSlot();
        // Park the vehicle
        await queryDb("INSERT INTO parked_vehicles SET ?", {
            slot_number: nearestSlot,
            registration_number: registrationNumber,
            vehicle_type: vehicleType
        });
        console.log(`Allocated slot number: ${nearestSlot}`);
    } catch (error) {
        console.log("Error parking vehicle");
        console.error(error);
    }
};

// Function to leave a parked vehicle
const leaveVehicle = async (registrationNumber, timeParked) => {
    try {
        // Get parking data for the given registration number
        const parkingData = await queryDb(
            "SELECT * FROM parked_vehicles WHERE registration_number = ?",
            [registrationNumber]
        );
        if (parkingData.length === 0) {
            console.log(`Registration number ${registrationNumber} not found`);
            return;
        }
        // Calculate the parking charges
        const charges = calculateCharges(parkingData[0].vehicle_type, timeParked);
        console.log(`Registration number ${registrationNumber} with Slot Number ${parkingData[0].slot_number} is free with Charge ${charges}`);
        // Remove the parked vehicle data
        await queryDb("DELETE FROM parked_vehicles WHERE registration_number = ?", [registrationNumber]);
    } catch (error) {
        console.error(error);
    }
};

// Function to calculate parking charges
const calculateCharges = (vehicleType, timeParked) => {
    let charges = 0;
    switch (vehicleType) {
        case "bike":
            charges = 10 * timeParked;
            break;
        case "car":
            charges = 20 * timeParked;
            break;
        case "bus":
            charges = 60 * timeParked;
            break;
        default:
            break;
    }
    return charges;
};

// Function to retrieve the slot number for a given registration number
const getSlotNumberForRegistrationNumber = async regNum => {
    try {
        // Query the database for the parked vehicle with the given registration number
        const parkingData = await queryDb(
            "SELECT slot_number FROM parked_vehicles WHERE registration_number = ?",
            [regNum]
        );
        // If the vehicle with the given registration number is not found, return -1
        if (parkingData.length === 0) {
            return -1;
        }
        // Return the slot number of the parked vehicle
        return parkingData[0].slot_number;
    } catch (error) {
        console.error(error);
    }
};

// Export the functions for use in other parts of the application
module.exports = {
    createParkingLot,
    parkVehicle,
    leaveVehicle,
    getSlotNumberForRegistrationNumber
};