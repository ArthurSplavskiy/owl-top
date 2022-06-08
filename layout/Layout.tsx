import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import { FunctionComponent, useRef, useState, KeyboardEvent } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipLinkHandler = (e: KeyboardEvent): void => {
		if(e.code === 'Space' || e.code === 'Enter') {
			e.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={styles.wrapper}>
			<span
				onFocus={(): void => setIsSkipLinkDisplayed(true)}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
				onKeyDown={skipLinkHandler}
			>До головного контенту</span>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<main className={styles.main} ref={bodyRef} tabIndex={0} role='main'>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>): typeof Component => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};