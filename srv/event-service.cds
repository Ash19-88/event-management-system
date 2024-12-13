using my.events from '../db/schema';

service EventService {
  entity Events as projection on events.Events;
  entity Participants as projection on events.Participants;
}
