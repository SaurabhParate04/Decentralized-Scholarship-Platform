import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import Invokecsr from './pages/Invokecsr';


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
			</Switch>
        </Router>
    </div>
  );
}

export default App;

