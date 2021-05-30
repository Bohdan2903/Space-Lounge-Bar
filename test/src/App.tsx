import { Route, Link } from 'react-router-dom'
import Home from './Home/index'
import Employees from './Employees/index'
import './App.scss'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/employees" component={Employees} />
    </main>
  </div>
)

export default App
