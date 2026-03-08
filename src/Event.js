function Event(props) {
  var locationSVG = (
    <svg
      width="145.35083mm"
      height="201.95552mm"
      viewBox="0 0 145.35083 201.95552"
      version="1.1"
      id="svg1"
    >
      {" "}
      <g id="layer1" transform="translate(-32.324587,-10.069739)">
        {" "}
        <path
          id="path1"
          d="m 102.45537,12.882734 c 73.76842,1.863615 78.2512,70.11517 66.95734,111.376896 -11.29386,41.26173 -65.96842,85.58039 -65.96842,85.58039 m 4.10034,-196.957286 c -73.768413,1.863615 -78.251196,70.11517 -66.957336,111.376896 11.29386,41.26173 65.968416,85.58039 65.968416,85.58039"
        />{" "}
        <circle id="path2" cx="105" cy="91.82103" r="32.149754" />{" "}
      </g>{" "}
    </svg>
  );
  var startdate = new Date(props.event.scheduled_start_time);
  var endDate = new Date(props.event.scheduled_end_time);
  var startDateDayStr = startdate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  var startdateMonthStr = startdate.toLocaleDateString("en-US", {
    month: "long",
  });
  var startdateDayNum = startdate.toLocaleDateString("en-US", {
    day: "numeric",
  });
  var finalDate =
    startDateDayStr +
    ", " +
    startdateMonthStr +
    " " +
    startdateDayNum +
    " (" +
    startdate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }) +
    " - " +
    endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }) +
    ")";

  var locationSVG = (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      style={{ fill: "white" }}
    >
      <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
    </svg>
  );

  return (
    <div className="Event">
      <h1>{props.event.name}</h1>
      <div className="event-content">
        <div className="event-location">
          <div>{locationSVG}</div>
          <div>{props.event.entity_metadata.location}</div>
        </div>
        <div className="event-desc-and-date">
          <div className="eventDate">{finalDate}</div>
          <div>{props.event.description}</div>
        </div>
      </div>
    </div>
  );
}
export default Event;
