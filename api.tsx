import moment from "moment";
import uuid from "uuid";

const url = "http://localhost:3000";

export function getEvents() {
  return fetch(url + "/events")
    .then((response) => response.json())
    .then((events) => events.map((e) => ({ ...e, date: new Date(e.date) })));
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("D MMM YYYY");
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("H A on D MMM YYYY");
}

export function saveEvent({ title, date }) {
  return fetch(url + "/events", {
    method: "POST",
    body: JSON.stringify({
      title,
      date,
      id: uuid(),
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date())
  );
  return {
    days: parseInt(duration.as("days")),
    hours: duration.get("hours"),
    minutes: duration.get("minutes"),
    seconds: duration.get("seconds"),
  };
}
