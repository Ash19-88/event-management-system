const { event } = require("@sap/cds");
const cds = require("@sap/cds");
const { message } = require("@sap/cds/lib/log/cds-error");
const { validateEvent, getEventById } = require("./utils/eventUtils");

module.exports = (srv) => {
  const { Events, Participants } = srv.entities;

  /** CREATE event */
  srv.on("createEvent", async (req) => {
    try {
      const { name, startDate, endDate, location, description } = req.data;

      if (!validateEvent(name, startDate, endDate, location, description)) {
        throw new Error("Invalid event data.");
      }
      const newEvent = await srv.run(
        INSERT.into(Events).entries({
          name,
          startDate,
          endDate,
          location,
          description,
          isActive: true,
          isCancelled: false,
        })
      );
      return {
        success: true,
        message: "Event created successfully.",
        event: newEvent,
      };
    } catch (error) {
      console.error("Error creating event:", error);
      return req.error(400, "Failed to create event. Please try again.");
    }
  });

  /** UPDATE event */
  srv.on("updateEvent", async (req) => {
    try {
      const { eventID, name, startDate, endDate, location, description } =
        req.data;
      if (!validateEvent(name, startDate, endDate, location, description)) {
        throw new Error("Invalid event data.");
      }
      const existingEvent = await getEventById(srv, eventID);
      if (!existingEvent || existingEvent.length === 0) {
        throw new Error("Event not found");
      }
      const updatedEventData = {
        name,
        startDate,
        endDate,
        location,
        description,
      };
      await srv.run(
        UPDATE(Events).set(updatedEventData).where({ ID: eventID })
      );

      const updatedEvent = await srv.run(
        SELECT.from(Events).where({ ID: eventID })
      );
      if (updatedEvent.length > 0) {
        return updatedEvent[0];
      }
      return {
        success: true,
        message: "Event updated successfully.",
        event: updatedEvent[0],
      };
    } catch (error) {
      console.error("Error updating event:", error);
      return req.error(400, "Failed to update event.");
    }
  });

  /** READ events */
  srv.on("readEvents", async (req) => {
    try {
      const events = await srv.run(SELECT.from(Events));
      return events;
    } catch (error) {
      console.error("Error reading events:", error);
      req.error(500, "Failed to read events.");
    }
  });

  /** DELETE event */
  srv.on("deleteEvent", async (req) => {
    try {
      const { eventID } = req.data;
      const existingEvent = await getEventById(srv, eventID);
      if (!existingEvent || existingEvent.length === 0) {
        throw new Error("Event not found");
      }
      await srv.run(DELETE.from(Events).where({ ID: ID }));
      return { success: true, message: "Event deleted successfully." };
    } catch (error) {
      console.error("Error deleting event:", error);
      return req.error(400, "Failed to deleted event:" + error.message);
    }
  });

  /** Cancel event */
  srv.on("cancelEvent", async (req) => {
    const { ID, reason } = req.data;
    if (!reason) return req.error(400, "Cancellation reason is required.");

    const event = await SELECT.one.from(Events).where({ ID });
    if (!event) return req.error(404, "Event not found.");
    if (event.isCancelled) {
      return req.error(400, "Event is already cancelled.");
    }

    await UPDATE(Events)
      .set({
        isCancelled: true,
        isActive: false,
        cancellationReason: reason,
      })
      .where({ ID });
    return { message: `Event ID ${ID} has been cancelled.` };
  });

  /** Reopen Event */
  srv.on("reopenEvent", async (req) => {
    const { ID } = req.data;

    const event = await SELECT.one.from(Events).where({ ID });
    if (!event) return req.error(404, "Event not found");

    if (!event.isCancelled) return req.error(400, "Event is not cancelled.");

    await UPDATE(Events)
      .set({ isCancelled: false, isActive: true, cancellationReason: null })
      .where({ ID });

    return { message: `Event ID ${ID} has been reopened.` };
  });

  /** REGISTER participant */
  srv.on("registerParticipant", async (req) => {
    const { eventID, participant } = req.data;
    const event = await SELECT.one.from(Events).where({ ID: eventID });
    if (!event) return req.error(404, "Event not found");

    const newParticipant = {
      firstName: participant.firstName,
      lastName: participant.lastName,
      email: participant.email,
      phone: participant.phone,
      businessPartnerID: participant.businessPartnerID,
      event_ID: eventID,
    };
    await INSERT.into(Participants).entries(newParticipant);
    return `Participant ${participant.firstName} ${participant.lastName} registered for Event ID ${eventID}.`;
  });
};
