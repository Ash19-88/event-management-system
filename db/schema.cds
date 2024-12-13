namespace my.events;

entity Events{
  key ID   : Integer;
      name : String(100);
      date : Date;
      location : String(255);
      participants : Composition of many Participants
                       on participants.event = $self;

}

entity Participants {
  key ID : Integer;
      name : String(100);
      email : String(255);
      event : Association to Events;
}
