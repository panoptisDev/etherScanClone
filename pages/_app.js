import "../styles/globals.css";

import { EtherProvider } from "../context/Ethere";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MyApp = ({ Component, pageProps }) => (
  <EtherProvider>
    <div className="position">
      <NavBar />

      <Component {...pageProps} />
      <Footer />
    </div>
  </EtherProvider>
);

export default MyApp;
