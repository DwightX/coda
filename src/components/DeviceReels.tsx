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

  // TODO: Improve this view
  const events: DeviceEvent[] = useSelector(getAllDeviceEvents);
  const eventDetails: DeviceEvent | undefined = events?.find((event) => {
    return event?.id?.toString() === eventId;
  });
  let hasReel = eventDetails?.reel?.state_current;

  // works in this component
  //   let hasTime = eventDetails?.event_timestamp;
  //   let str = hasTime;
  //   let date = moment(str);

  let reelInformation;
  if (hasReel === "RS") {
    reelInformation = <p> <h2 className="whiteHeader">Reel Status</h2>Reel Stopped</p>;
  } else if (hasReel === "RR") {
    reelInformation = <p><h2>Reel Status</h2>Reel Retracting (pulling in and spraying water)</p>;
  } else if (hasReel === "RE") {
    reelInformation = <p><h2>Reel Status</h2>Reel Extending (being towed out by a tractor)</p>;
  }
  return <>{reelInformation}</>;
}

export default DeviceReels;
