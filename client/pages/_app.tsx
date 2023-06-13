import "../styles/globals.css";
import SocketsProvider from "../context/socket";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default MyApp;
