import { Provider } from "react-redux"
import store from "../store/store"
import DashboardLayout from "../components/DashboardLayout"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  </Provider>
)};