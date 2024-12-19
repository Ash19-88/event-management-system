const cds = require("@sap/cds");

module.exports = (srv) => {
  const { Participants } = srv.entities;

  /** CREATE participant */
  srv.on("createParticipant", async (req) => {
    try {
      const { firstName, lastName, email, phone, businessPartnerID } = req.data;

      const newParticipant = {
        firstName,
        lastName,
        email,
        phone,
        businessPartnerID,
      };
      await INSERT.into(Participants).entries(newParticipant);
      return `Participant ${firstName} ${lastName} created.`;
    } catch (error) {
      console.error("Error creating participant:", error);
      req.error(500, "Failed to create participant.");
    }
  });

  /** UPDATE participant */
  srv.on("updateParticipant", async (req) => {
    try {
      const { ID, firstName, lastName, email, phone } = req.data;

      const updatedParticipant = {
        firstName,
        lastName,
        email,
        phone,
      };

      await UPDATE(Participants).set(updatedParticipant).where({ ID });

      return `Participant with ID ${ID} updated.`;
    } catch (error) {
      console.error("Error updating participant:", error);
      req.error(500, "Failed to update participant.");
    }
  });

  /** READ participants */
  srv.on("readParticipants", async (req) => {
    try {
      const participants = await SELECT.from(Participants);
      return participants;
    } catch (error) {
      console.error("Error reading participants:", error);
      req.error(500, "Failed to read participants.");
    }
  });

  /** DELETE participant */
  srv.on("deleteParticipant", async (req) => {
    try {
      const { ID } = req.data;

      await DELETE.from(Participants).where({ ID });

      return `Participant with ID ${ID} deleted.`;
    } catch (error) {
      console.error("Error deleting participant:", error);
      req.error(500, "Failed to delete participant.");
    }
  });

  /** DETAILS of participant */
  srv.on("participantDetails", async (req) => {
    try {
      const { businessPartnerID } = req.data;
      const participant = await SELECT.one
        .from(Participants)
        .where({ businessPartnerID });

      if (!businessPartnerID) {
        return req.error(
          404,
          `Participant with businessPartnerID ${businessPartnerID} not found.`
        );
      }
      return participant;
    } catch (error) {
      console.error("Error getting participant details:", error);
      req.error(500, "Error retrieving participant details.");
    }
  });
};
