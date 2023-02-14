const readline = require("readline");
const validateInput = require("./utils/validateInput");
const parking = require("./utils/parking");

// Create a readline interface to read from standard input and write to standard output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Handle user input and perform the corresponding action
const handleUserInput = async line => {
  const input = line.trim().split(" "); // split the input line on spaces to get command and its arguments
  const command = input[0];
  switch (command) {
    case "create_parking_lot":
      const lotSize = input[1];
      await parking.createParkingLot(lotSize);
      break;
    case "park":
      if (!validateInput.validateParkVehicleInput(input)) {
        console.log("Invalid input for park command");
        break;
      }
      const registrationNumber = input[1];
      const vehicleType = input[2];
      await parking.parkVehicle(registrationNumber, vehicleType);
      break;
    case "leave":
      if (!validateInput.validateLeaveInput(input)) {
        console.log("Invalid input for leave command");
        break;
      }
      const slotNumber = input[1];
      await parking.leaveVehicle(slotNumber);
      break;
    case "status":
      await parking.getParkingStatus();
      break;
    case "slot_number_for_registration_number":
      if (!validateInput.validateSlotNumberForRegistrationNumberInput(input)) {
        console.log("Invalid input for slot_number_for_registration_number command");
        break;
      }
      const regNum = input[1];
      await parking.getSlotNumberForRegistrationNumber(regNum);
      break;
    default:
      console.log(`Invalid Command: ${command}`);
      break;
  }
  rl.prompt();
};

// Show the prompt to the user
rl.prompt();

// Listen for input from the user and call handleUserInput for each line of input
rl.on("line", handleUserInput);
