import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";
import Slider from "@mui/material/Slider";

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
    pumpInformation = (
      <div>
        <h2 style={{ color: "#e5be20" }}>Water Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>
          Water Pressure High {pumpPressure} PSI
        </p>
      </div>
    );
  } else if (hasPump === "PLO") {
    pumpInformation = (
      <div>
        <h2 style={{ color: "#e5be20" }}>Water Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>
          Water Pressure Low (or off) {pumpPressure} PSI
        </p>
      </div>
    );
  } else if (hasPump === "POV") {
    pumpInformation = (
      <div>
        <h2 style={{ color: "#e5be20" }}>Water Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>
          Water Pressure is above safe threshold {pumpPressure} PSI
        </p>
      </div>
    );
  }
  return <>{pumpInformation}</>;
}

export default DevicePumps;
