import React, { useState } from "react";
import { generatePath, Link as RouterLink, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deviceEvents, fetchDeviceEvents, fetchFields } from "../reducers";
import { Badge } from "@mui/material";
import { getAllDeviceEvents } from "../reducers";
import { useSelector } from "react-redux";
import Device from "../components/Device";
import { DeviceEvent } from "../types";




import {
  Box,
  List,
  ListSubheader,
} from "@mui/material";

const EVENT_PAGE_PATH = "/event-:id";

function DevicesPage({ eventId }: { eventId: string }): JSX.Element {
  // TODO: Improve this view
  const events = useSelector(getAllDeviceEvents);
  const dispatch = useDispatch();

  // if (events && events.length > 0) {
  //   const [{ device_alias }] = events;
  //   console.log(device_alias);
  // }

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
        justifyContent: "space-evenly"
      }}
    >
          <Device/>
          </Box>
    </div>
  );
}

export default DevicesPage;
