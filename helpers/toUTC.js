import { DateTime } from "luxon";

export default function toUTCDateTime(dateString) {
    return DateTime.fromISO(dateString, {zone: 'utc'}).toUTC();
}