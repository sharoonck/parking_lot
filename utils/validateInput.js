const validateParkVehicleInput = (input) => {
  if (!input || input.length !== 3) {
    return false;
  }

  const [registrationNumber, vehicleType, timeParked] = input;

  if (!registrationNumber || !vehicleType || !timeParked) {
    return false;
  }

  if (!["car", "bike","bus"].includes(vehicleType.toLowerCase())) {
    return false;
  }

  if (!/^\d+$/.test(timeParked)) {
    return false;
  }

  return true;
};

const validateLeaveInput = (input) => {
  if (!input || input.length !== 2) {
    return false;
  }

  const [registrationNumber, timeParked] = input;

  if (!registrationNumber || !timeParked) {
    return false;
  }

  if (!/^\d+$/.test(timeParked)) {
    return false;
  }

  return true;
};

const validateSlotNumberForRegistrationNumberInput = input => {
  if (!input) {
    return {
      error: "Input is required"
    };
  }
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return {
      error: "Input is required"
    };
  }
  return {
    value: trimmedInput
  };
};


module.exports = {
  validateParkVehicleInput,
  validateLeaveInput,
  validateSlotNumberForRegistrationNumberInput
};