import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './redux/store';
import Body from './components/body/Body';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/reusuable.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Body/>
    </BrowserRouter>
  </Provider>
);
export default App;