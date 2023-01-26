import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Invokecsr from './pages/Invokecsr';
import Invokesch from './pages/Invokesch';
import Enroll from './pages/Enroll';
import Register from './pages/Register';


function App() {
  const useScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0 });
      // scroll to the top of the browser window when changing route
      // the window object is a normal DOM object and is safe to use in React.
    }, [location]);
  };

  //console.log(account);
  return (
    <div className="App">
        <Router >
			<Switch>
				<Route exact path="/invokecsr">
					<Invokecsr useScrollToTop={useScrollToTop} />
				</Route>
        <Route exact path="/invokesch">
					<Invokesch useScrollToTop={useScrollToTop} />
				</Route>
        <Route exact path="/enroll">
					<Enroll useScrollToTop={useScrollToTop} />
				</Route>
        <Route exact path="/register">
					<Register useScrollToTop={useScrollToTop} />
				</Route>
			</Switch>
        </Router>
    </div>
  );
}

export default App;

