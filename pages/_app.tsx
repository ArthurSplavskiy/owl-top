import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Owltop - The best top</title>
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
				<meta property='og:locale' content='uk_UK'></meta>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
