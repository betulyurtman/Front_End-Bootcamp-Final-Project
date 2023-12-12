import { Provider } from "react-redux"
import store from "./store/store"
import DashboardLayout from "./components/DashboardLayout"

export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  </Provider>
)};