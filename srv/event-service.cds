using my.events from '../db/schema';

service EventService {
  entity Events as projection on events.Events;
  
  action createEvent(name : String, startDate : Date, endDate : Date, location : String, description : String);

  action updateEvent(ID : Integer, name : String, startDate : Date, endDate : Date, location : String, description : String);

  function readEvents() returns array of Events;
  action deleteEvent(ID: Integer);


  action cancelEvent(ID : Integer, reason : String);
  action reopenEvent(ID : Integer);

  entity Participants as projection on events.Participants;
   action registerParticipant(eventID : Integer, participant : Participants);
}
