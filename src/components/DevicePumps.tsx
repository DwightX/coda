import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";

function DevicePumps({ eventId }: { eventId: string }): JSX.Element {
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

  let hasPump = eventDetails?.pressure?.state_current;
  let pumpPressure = eventDetails?.pressure?.reading_kpa;

  let pumpInformation;
  if (hasPump === "PHI") {
    pumpInformation = <p><h2>Water Status</h2>Water Pressure High {pumpPressure}</p>;
  } else if (hasPump === "PLO") {
    pumpInformation = <p><h2>Water Status</h2>Water Pressure Low (or off) {pumpPressure}</p>;
  } else if (hasPump === "POV") {
    pumpInformation = <p><h2>Water Status</h2>Water Pressure is above safe threshold {pumpPressure}</p>;
  }
  return <>{pumpInformation}</>;
}

export default DevicePumps;
