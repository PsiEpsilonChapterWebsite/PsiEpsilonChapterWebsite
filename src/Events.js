import { React, useState, useEffect } from "react";
import exclamation from "./exclamation.png";
import i18next from "./i18n";
import Event from "./Event";

function Events() {
  const fakeEvents = [
    {
      id: "1142485402280808508",
      guild_id: "884845367844294657",
      name: "General Meeting #2",
      description: "",
      channel_id: null,
      creator_id: "356119028751663105",
      creator: {
        id: "356119028751663105",
        username: "barbasil",
        avatar: "a1e9195ce0b14625b903a76b56e5cf96",
        discriminator: "0",
        public_flags: 0,
        flags: 0,
        banner: null,
        accent_color: 16752844,
        global_name: "basil",
        avatar_decoration_data: null,
        banner_color: "#ffa0cc",
      },
      image: null,
      scheduled_start_time: "2023-09-06T23:30:00+00:00",
      scheduled_end_time: "2023-09-07T00:30:00+00:00",
      status: 1,
      entity_type: 3,
      entity_id: null,
      user_count: 4,
      privacy_level: 2,
      sku_ids: [],
      entity_metadata: {
        location: "Skurla 102",
      },
    },
    {
      id: "1142485879408054393",
      guild_id: "884845367844294657",
      name: "Karaoke! 🎤",
      description:
        "Bestest event known to man! Pretty self explanatory too. I ❤️ KARAOKE!!",
      channel_id: null,
      creator_id: "356119028751663105",
      creator: {
        id: "356119028751663105",
        username: "barbasil",
        avatar: "a1e9195ce0b14625b903a76b56e5cf96",
        discriminator: "0",
        public_flags: 0,
        flags: 0,
        banner: null,
        accent_color: 16752844,
        global_name: "basil",
        avatar_decoration_data: null,
        banner_color: "#ffa0cc",
      },
      image: null,
      scheduled_start_time: "2023-09-08T23:00:00+00:00",
      scheduled_end_time: "2023-09-09T01:00:00+00:00",
      status: 1,
      entity_type: 3,
      entity_id: null,
      user_count: 2,
      privacy_level: 2,
      sku_ids: [],
      entity_metadata: {
        location: "Pantherium",
      },
    },
    {
      id: "1142486562991525949",
      guild_id: "884845367844294657",
      name: "Potluck!",
      description:
        "-INVITE ONLY- \nBring a food or drink if you wanna. :)\nDM for address.",
      channel_id: null,
      creator_id: "356119028751663105",
      creator: {
        id: "356119028751663105",
        username: "barbasil",
        avatar: "a1e9195ce0b14625b903a76b56e5cf96",
        discriminator: "0",
        public_flags: 0,
        flags: 0,
        banner: null,
        accent_color: 16752844,
        global_name: "basil",
        avatar_decoration_data: null,
        banner_color: "#ffa0cc",
      },
      image: null,
      scheduled_start_time: "2023-09-10T00:00:00+00:00",
      scheduled_end_time: "2023-09-10T05:00:00+00:00",
      status: 1,
      entity_type: 3,
      entity_id: null,
      user_count: 6,
      privacy_level: 2,
      sku_ids: [],
      entity_metadata: {
        location: "Tause - DM FOR ADDRESS",
      },
    },
    {
      id: "1148610284282462328",
      guild_id: "884845367844294657",
      name: "Resume and Career Workshop with AIChE",
      description: "Bring your resume or laptop to access it.",
      channel_id: null,
      creator_id: "356119028751663105",
      creator: {
        id: "356119028751663105",
        username: "barbasil",
        avatar: "a1e9195ce0b14625b903a76b56e5cf96",
        discriminator: "0",
        public_flags: 0,
        flags: 0,
        banner: null,
        accent_color: 16752844,
        global_name: "basil",
        avatar_decoration_data: null,
        banner_color: "#ffa0cc",
      },
      image: null,
      scheduled_start_time: "2023-09-06T22:30:00+00:00",
      scheduled_end_time: "2023-09-06T23:30:00+00:00",
      status: 1,
      entity_type: 3,
      entity_id: null,
      user_count: 1,
      privacy_level: 2,
      sku_ids: [],
      entity_metadata: {
        location: "OLS 130",
      },
    },
    {
      id: "1148610794947358770",
      guild_id: "884845367844294657",
      name: "Painting 🎨🖌",
      description: "",
      channel_id: null,
      creator_id: "356119028751663105",
      creator: {
        id: "356119028751663105",
        username: "barbasil",
        avatar: "a1e9195ce0b14625b903a76b56e5cf96",
        discriminator: "0",
        public_flags: 0,
        flags: 0,
        banner: null,
        accent_color: 16752844,
        global_name: "basil",
        avatar_decoration_data: null,
        banner_color: "#ffa0cc",
      },
      image: null,
      scheduled_start_time: "2023-09-07T23:00:00+00:00",
      scheduled_end_time: "2023-09-08T01:00:00+00:00",
      status: 1,
      entity_type: 3,
      entity_id: null,
      user_count: 1,
      privacy_level: 2,
      sku_ids: [],
      entity_metadata: {
        location: "Residential Quad",
      },
    },
  ];
  const [data, setData] = useState(fakeEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://bots.hman.io/fitthetatauevents/json")
      .then((response) => {
        if (!response.ok) {
          setData(fakeEvents);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data || fakeEvents);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        if (!data) {
          // If data hasn't already been set
          setData(fakeEvents);
        }
        setLoading(false);
      });
  }, []);
  console.log(data);
  console.log(data.length);
  var eventDivs = [];
  for (var i = 0; i < data.length; i++) {
    var event = data[i];
    console.log(event);
    eventDivs.push(<Event event={event} />);
  }
  var eventsError = (
    <div className="EventsError">
      <img
        style={{ width: "7vw", height: "7vw" }}
        src={exclamation}
        alt="Error"
      />
      <div className="error-content">
        <div>{i18next.t("events-error-title")}</div>{" "}
        <div>{i18next.t("events-error-content")}</div>
      </div>
    </div>
  );

  // for (var i = 0; i < data.length; i++) {}

  var dataReturn = <div>{/* Render your data here */}</div>;

  return (
    <div className="Events">
      {loading && <div>Loading...</div>}
      {error && eventsError}
      {!loading && data && eventDivs}
      {!loading && !error && data && dataReturn}
    </div>
  );
}

export default Events;
