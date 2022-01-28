import './App.css';

import React from 'react';
import { Link as RouterLink, Route, Switch } from 'react-router-dom';
import DevicesPage from './components/DevicesList';
import DevicesDetails from './components/DevicesDetails';
import Header from './components/Header';

import {
    AppBar, Box, Container, List, ListItem, ListItemText, ListSubheader, Toolbar, Typography
} from '@mui/material';


const EVENT_PAGE_PATH = "/event-:id";

function Page404(): JSX.Element {
  return (
    <Box flex={1} display="flex" justifyContent="center" alignItems="center">
      <Typography flex={1}>404</Typography>
    </Box>
  );
}
export default function App(): JSX.Element {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
    >
<Header />
      <Container>
        <Switch>
          <Route
            render={({ match }): JSX.Element => {
              const eventId = match.params.id;
              return <DevicesDetails eventId={eventId} key={eventId} />;
            }}
            exact
            path={EVENT_PAGE_PATH}
          />
          <Route exact path="/" component={DevicesPage}></Route>
          <Route component={Page404} />
        </Switch>
      </Container>
    </Box>
  );
}
