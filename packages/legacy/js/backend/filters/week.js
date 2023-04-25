async function filter_week_view(start, end, events_list) {
  const filtered_events = Array.isArray(events_list)
    ? events_list.filter((event) => {
        const event_date = new Date(event.event_date);
        return (
          event.approved === "true" && event_date >= start && event_date <= end
        );
      })
    : null;
  return filtered_events;
}

export default filter_week_view;
