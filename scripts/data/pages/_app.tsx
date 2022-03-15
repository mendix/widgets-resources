import SSRProvider from "react-bootstrap/SSRProvider";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-data-grid/dist/react-data-grid.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SSRProvider>
            <Component {...pageProps} />
        </SSRProvider>
    );
}

export default MyApp;
