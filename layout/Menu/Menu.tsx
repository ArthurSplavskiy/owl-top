import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, firstCategory, setMenu } = useContext(AppContext);
	const router = useRouter();
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();

	const openSecondLevel = (secondCategory: string): void => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (e: KeyboardEvent, secondCategory: string): void => {
		if(e.code === 'Enter' || e.code === 'Space') {
			e.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1 
			}
		},
		hidden: {
			marginBottom: 0
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: {
			opacity: 0,
			height: 0
		}
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<ul>
				{
					firstLevelMenu.map(m => 
						<li key={m.id} aria-expanded={m.id === firstCategory}>
							<Link href={`/${m.route}`}>
								<a>
									<div className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: m.id === firstCategory
									})}>
										{m.icon}
										<span>
											{m.name}
										</span>
									</div>
								</a>
							</Link>
							
							{m.id === firstCategory && buildSecondLevel(m)}
						</li>
					)
				}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}

					return <li key={m._id.secondCategory}>
						<button
							className={styles.secondLevel}
							onClick={(): void => openSecondLevel(m._id.secondCategory)}
							onKeyDown={(e: KeyboardEvent): void => openSecondLevelKey(e, m._id.secondCategory)}
							aria-expanded={m.isOpened}
						>{m._id.secondCategory}</button>
						<motion.ul
							layout
							variants={variants}
							initial={m.isOpened ? 'visible' : 'hidden'}
							animate={m.isOpened ? 'visible' : 'hidden'}
							className={cn(styles.secondLevelBlock)}
						>
							{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
						</motion.ul>
					</li>;
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element => {
		return <>
			{pages.map(p => (
				<motion.li
					key={p._id}
					variants={variantsChildren}
				>
					<Link href={`/${route}/${p.alias}`}>
						<a 
							tabIndex={isOpened ? 0 : -1}
							className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
						})}>
							{p.category}
						</a>
					</Link>
				</motion.li>
			))}
		</>;
	};

	return (
		<div className={styles.menu}>
			{announce && <span role='log' className='visualyHidden'>{announce === 'opened' ? 'розгорнуто' : 'згорнуто'}</span>}
			{buildFirstLevel()}
		</div>
	);
};
