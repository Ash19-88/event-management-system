namespace my.events;

entity Events{
  key ID   : Integer;
      name               : String(100);
      startDate          : Date;
      endDate            : Date;
      location           : String(255);
      description        : String(500);
      isActive           : Boolean default true;
      isCancelled        : Boolean default false;
      cancellationReason : String(255);
      participants       : Composition of many Participants
                             on participants.event = $self;

}

entity Participants {
  key ID : Integer;
      firstName : String(100);
      lastName  : String(100);
      email     : String(100);
      phone     : String(100);
      businessPartnerID : String;
      event : Association to Events;
}
