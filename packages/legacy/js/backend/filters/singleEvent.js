async function filter_certain_event(event_id, events_list) {
  const today = new Date();
  const certain_event = events_list.filter((event) => {
    const event_date = new Date(event.event_date);
    return event.id === event_id && event_date >= today;
  });
  return certain_event;
}

export default filter_certain_event;
