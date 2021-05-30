import { Link } from 'react-router-dom'

const Index = () => (
  <div className={'wrapper'}>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <Link to="/employees">Go to employees page</Link>
  </div>
)

export default Index
