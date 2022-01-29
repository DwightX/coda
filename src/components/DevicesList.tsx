import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeviceEvents, fetchFields } from "../reducers";
import { getAllDeviceEvents } from "../reducers";
import { useSelector } from "react-redux";
import Device from "../components/Device";
import { Box } from "@mui/material";

const EVENT_PAGE_PATH = "/event-:id";

function DevicesPage({ eventId }: { eventId: string }): JSX.Element {
  // TODO: Improve this view
  const events = useSelector(getAllDeviceEvents);
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

  React.useEffect(
    /**
     * Mock API call to get field data
     */
    (): void => {
      dispatch(fetchFields());
    },
    [dispatch]
  );

  return (
    <div id="events-list">
      <Box
        className="hh"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "space-evenly",
        }}
      >
        <Device />
      </Box>
    </div>
  );
}

export default DevicesPage;
