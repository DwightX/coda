import { fetchDeviceEvents, getAllDeviceEvents } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import React from "react";

function DeviceReels({ eventId }: { eventId: string }): JSX.Element {
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
  let hasReel = eventDetails?.reel?.state_current;

  let reelInformation;
  if (hasReel === "RS") {
    reelInformation = (
      <div>
        {" "}
        <h2 style={{ color: "#e5be20" }}>Reel Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>Reel Stopped</p>
      </div>
    );
  } else if (hasReel === "RR") {
    reelInformation = (
      <div>
        <h2 style={{ color: "#e5be20" }}>Reel Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>
          Reel Retracting (pulling in and spraying water)
        </p>
      </div>
    );
  } else if (hasReel === "RE") {
    reelInformation = (
      <div>
        <h2 style={{ color: "#e5be20" }}>Reel Status</h2>
        <p style={{ color: "white", fontSize: "1.5em" }}>
          Reel Extending (being towed out by a tractor)
        </p>
      </div>
    );
  }
  return <>{reelInformation}</>;
}

export default DeviceReels;
