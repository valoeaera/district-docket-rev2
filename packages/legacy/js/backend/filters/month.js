async function filter_month_view(month, year, events_list) {
  const filtered_events = events_list.filter((event) => {
    const event_date = new Date(event.event_date);
    return (
      event_date.getMonth() === month &&
      event_date.getFullYear() === parseInt(year)
    );
  });
  return filtered_events;
}

export default filter_month_view;
