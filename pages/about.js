import Head from 'next/head';
import TheNav from '../components/TheNav';

export default () => (
  <div>
    <Head>
      <title>This is the About Page</title>
    </Head>
    <div className="text has-background-success">testing 123</div>
    <img src="/static/images/rock.png" />
  </div>
);
