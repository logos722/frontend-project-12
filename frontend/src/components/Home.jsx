import { loremIpsum } from 'lorem-ipsum';

const Home = () => (
  <>
    <h3>Home page</h3>
    <div>
      Page content: {loremIpsum({ count: 5 })}
    </div>
  </>
);

export default Home;
