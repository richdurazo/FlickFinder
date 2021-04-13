import './App.scss';
import { Switch, Route } from 'react-router-dom';
import MovieSearch from './pages/MovieSearch/MovieSearch';
import MovieDetails from './pages/MovieDetails/MovieDetails';


function App() {

  const routes = (
    <Switch>
      <Route path='/' exact component={MovieSearch} />
      <Route path='/movie-details' exact component={MovieDetails} />
    </Switch>
  )
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
