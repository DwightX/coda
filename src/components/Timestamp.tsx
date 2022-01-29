import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";
import moment from "moment";

function DeviceTimestamp({ eventId }: { eventId: string }): JSX.Element {
  const dispatch = useDispatch();
  React.useEffect(
    /**
     * Mock api call to get device events
     */
    () => {
      dispatch(fetchDeviceEvents());
    },
    [dispatch]
  );
  const events: DeviceEvent[] = useSelector(getAllDeviceEvents);
  const eventDetails: DeviceEvent | undefined = events?.find((event) => {
    return event?.id?.toString() === eventId;
  });

  // Doesnt works in this component makes no fuckign sense
  let hasTime = eventDetails?.event_timestamp;
  let str = hasTime;
  let date = moment(str);
  let convertedTime = date.format("llll");

  return (
    <>
      <p>{convertedTime}</p>
    </>
  );
}

export default DeviceTimestamp;
