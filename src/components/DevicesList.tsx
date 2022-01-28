import React, {useState} from 'react';
import { generatePath, Link as RouterLink, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deviceEvents, fetchDeviceEvents, fetchFields } from '../reducers';
import { Badge } from '@mui/material';
import { getAllDeviceEvents } from "../reducers";
import { useSelector } from "react-redux";
import { DeviceEvent } from "../types";
import { useEffect } from 'react';





import {
  Box,
  List,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";

const EVENT_PAGE_PATH = "/event-:id";

function DevicesPage(): JSX.Element {
  // TODO: Improve this view
  const events = useSelector(getAllDeviceEvents);
  const dispatch = useDispatch();

  console.log(events)

  const device_names = events.map((o) => <li key={o.id}> {o.device_alias}</li>);

  console.log(device_names)
  
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
      <List subheader={<ListSubheader>Your Device Activity</ListSubheader>}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap:'5px',justifyContent: 'space-evenly'  }}>
          {events.map((event) => (
            <Box
              sx={{ width:"25%"}}
              className="deviceWrapper mdc-ripple-surface"
              id={`event-list-item-${event.id}`}
              key={event.id}
            >
              <div className="deviceCard"> 
              {/* <Badge max={1000} color="primary" badgeContent={event.id}></Badge> */}
              <ListItemText
                primary={
                  <Typography
                    component={RouterLink}
                    to={generatePath(EVENT_PAGE_PATH, { id: event.id })}
                  >
                    <h1 className="deviceTitle">{device_names}</h1>
                  </Typography>
                }
              />
              <div className='deviceData'> 
              <ListItemText
                secondary={
                  <Typography paragraph={true}>Reel:{event.reel?.state_current} + {event.reel?.run_speed_mmpm}</Typography>
                }
              />
             <ListItemText
                secondary={
                  <Typography paragraph={true}>Pressure:{event.pressure?.state_current} {event.pressure?.reading_kpa}</Typography>
                }
              />
              </div>
              </div>
            </Box>
          ))}
        </Box>
      </List>
    </div>
  );
}

export default DevicesPage;
