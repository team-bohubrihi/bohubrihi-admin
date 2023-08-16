import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Body from './components/body/Body';
import './css/reusuable.css';
import { store } from './redux/store';

// Meshkat comment

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    </Provider>
);
export default App;
