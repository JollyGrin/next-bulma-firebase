import TheNav from '../components/TheNav';

export default () => (
  <div>
    <TheNav />
    <div className="text has-background-success">testing 123</div>
    <img src="/static/images/rock.png" />
    <style jsx>{`
      img {
        height: 500px;
      }
      .text {
        color: red;
      }
    `}</style>
  </div>
);
