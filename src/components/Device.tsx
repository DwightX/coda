import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { getAllDeviceEvents } from "../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { generatePath, Link as RouterLink, Route } from "react-router-dom";
import { fetchDeviceEvents, fetchFields } from "../reducers";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { motion } from "framer-motion";
import Timestamp from "../components/Timestamp";

function Device(): JSX.Element {
  const EVENT_PAGE_PATH = "/event-:id";
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
    <>
      {events.map((event) => (
        <motion.div key={event.id} whileHover={{ scale: 1.1 }}>
          <Card
            className="glossy"
            sx={{
              minWidth: 300,
              maxWidth: 300,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1 className="deviceTitle">{event.device_alias}</h1>
            <Divider className="dividerHr" variant="middle" />
            <Stack sx={{ padding: "10px" }} direction="row" spacing={2}>
              {event.pressure?.state_current && (
                <Avatar>{event.pressure?.state_current}</Avatar>
              )}
              {event.reel?.state_current && (
                <Avatar>{event.reel?.state_current}</Avatar>
              )}
            </Stack>
            <CardActions style={{flexDirection:"column-reverse"}}>
              <Button
                component={RouterLink}
                to={generatePath(EVENT_PAGE_PATH, { id: event.id })}
                size="small"
                variant="contained"
              >
                More Details
              </Button>
              <Timestamp eventId={event.id.toString()} />
            </CardActions>
          </Card>
        </motion.div>
      ))}
    </>
  );
}

export default Device;
