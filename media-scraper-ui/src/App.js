import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ROUTES } from './configs/routes';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Notify from './components/Notify';
import Auth from './HOC/Auth';
import history from './components/History';

function App() {
    const generateRoutes = () => {
        return ROUTES.map((route, index) => {
            const Component = route.auth ? Auth : Route;
            return <Component {...route} key={index} />
        });
    }

    return (
        <BrowserRouter>
            <Router history={history}>
                <CssBaseline />
                <NavBar />
                <div className="spaceTop">
                    <Switch>
                        {generateRoutes()}
                    </Switch>
                </div>
                <Notify />
            </Router>
        </BrowserRouter>
    );
}

export default App;
