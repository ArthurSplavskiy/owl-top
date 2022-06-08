import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import SearchIcon from './search.svg';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';

export const Search = ({
	className,
	...props
}: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');

	const router = useRouter();

	const goToSearch = (): void => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		e.key === 'Enter' && goToSearch();
	};

	return (
		<form className={cn(className, styles.search)} {...props} role='search'>
			<Input
				placeholder='Пошук...' 
				className={styles.input}
				value={search}
				onChange={(e): void => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				className={styles.button}
				appearance='primary'
				onClick={goToSearch}
				aria-label='Пошук по сайту'
			>
				<SearchIcon />
			</Button>
		</form>
	);
};
