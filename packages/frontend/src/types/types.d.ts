interface Event {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventCost: number;
  repeatEvent: boolean;
  eventFrequency: string | null;
  venueAddress: string;
  venueName: string;
  venueCity: string;
  venueState: string;
  venueZIPCode: string;
  contactName: string;
  hostOrganization: string;
  description: string;
  tags: string[];
  image: any;
  approvalStatus: string;
}

type InputChangeHandler = (
  fieldName: string,
  fieldValue: string | number | boolean,
  inputType: string
) => void;

export { Event, InputChangeHandler };
