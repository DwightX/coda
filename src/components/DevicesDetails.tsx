import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";


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

    const eventDetails: DeviceEvent | undefined  =  events?.find((event) => {
      return event?.id?.toString() === eventId;
    });
    console.log(eventDetails);
  
    return (
    <div id="event-page">{eventDetails?.device_alias}</div>
    )
  }

  export default DevicesDetails;