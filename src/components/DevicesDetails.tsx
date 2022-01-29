import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";
import DeviceReels from "../components/DeviceReels";
import DevicePumps from "../components/DevicePumps";
import Timestamp from "../components/Timestamp";

function DevicesDetails({ eventId }: { eventId: string }): JSX.Element {
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

  // TODO: Improve this view

  const events: DeviceEvent[] = useSelector(getAllDeviceEvents);

  const eventDetails: DeviceEvent | undefined = events?.find((event) => {
    return event?.id?.toString() === eventId;
  });

  return (
    <div className="glossy" id="event-page">
      <h1 className="mainHeader">Device : <span className="spanHeader">{eventDetails?.device_alias}</span></h1>
      <DeviceReels eventId={eventId} />
      <DevicePumps eventId={eventId} />
      <Timestamp eventId={eventId} />
    </div>
  );
}

export default DevicesDetails;
