using my.events from '../db/schema';

service ParticipantService {
  entity Participants as projection on events.Participants;
  entity Events as projection on events.Events;

  action createParticipant(firstName : String, lastName : String, email : String, phone : String, businessPartnerID : String);

  action updateParticipant(ID : Integer, firstName : String, lastName : String, email : String, phone : String);

  function readParticipants() returns array of Participants;
  action deleteParticipant(ID : Integer);

 action participantDetails(businessPartnerID : String) returns Participants;
 
}