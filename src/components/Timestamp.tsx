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

  const hasTime = eventDetails?.event_timestamp;
  const date = moment(hasTime);
  const convertedTime = date.format("llll");

  return (
    <>
      <p style={{ color: "antiquewhite", fontSize: "1em" }}>{convertedTime}</p>
    </>
  );
}

export default DeviceTimestamp;
