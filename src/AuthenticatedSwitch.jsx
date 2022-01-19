import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { TransitionGroup } from 'react-transition-group';
import Home from './pages/home/Home';
import FourOhFour from './pages/fourohfour/FourOhFour';
import { defaultCrossfadeDuration } from './constants/defaults';

export default function AuthenticatedSwitch() {
  return (
    <main>
      <Route
        render={({ location }) => (
          <TransitionGroup appear>
            <Fade
              key={location.key}
              timeout={defaultCrossfadeDuration}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    minHeight: 'calc(100vh - 64px)',
                    boxSizing: 'border-box',
                  }}
                >
                  <Switch location={location}>
                    {/* <Route path="/users/:id">
                      <User />
                    </Route>
                    <Route path="/users">
                      <Users />
                    </Route> */}
                    <Route path="/welcome">
                      <span>Welcome</span>
                    </Route>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                    <Route>
                      <FourOhFour />
                    </Route>
                  </Switch>
                </div>
              </div>
            </Fade>
          </TransitionGroup>
        )}
      />
    </main>
  );
}
