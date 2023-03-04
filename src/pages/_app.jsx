import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor} loading={null}>
    //     {() => {
    //       return (
    //         <>
    //           <Component {...pageProps} />
    //           <ToastContainer />
    //         </>
    //       );
    //     }}
    //   </PersistGate>
    // </Provider>
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
