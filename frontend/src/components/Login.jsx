import { loremIpsum } from 'lorem-ipsum';

const Login = () => (
  <>
    <h2>Login page</h2>
    <div>Page content: {loremIpsum({ count: 3 })}</div>
  </>
);

export default Login;
