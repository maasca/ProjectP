exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (parkings) => {
  const parkingsIds = parkings.map((parking) => parking.id);
  const maxId = parkingsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;

  return uniqueId;
};
