import styles from './Sort.module.css';
import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import SortIcon from './sort.svg';
import { KeyboardEvent } from 'react';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {

	const keyHandler = (e: KeyboardEvent, sortType: SortEnum): void => {
		if(e.code === 'Space' || e.code === 'Enter') {
			e.preventDefault();
			setSort(sortType);
		}
	};

	return (
		<div
			className={cn(styles.sort, className)}
			{...props}
		>
			<div id='sort' className={styles.sortName}>Сортування</div>
			<button
				id='sortRating'
				tabIndex={0}
				onClick={(): void => setSort(SortEnum.Rating)}
				onKeyDown={(e: KeyboardEvent): ReturnType<typeof keyHandler> => keyHandler(e, SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
				aria-selected={sort === SortEnum.Rating}
				aria-labelledby='sort sortRating'
			>
				{sort === SortEnum.Rating && <SortIcon className={styles.sortIcon} />} По рейтингу
			</button>
			<button
				id='sortPrice'
				tabIndex={0}
				onClick={(): void => setSort(SortEnum.Price)}
				onKeyDown={(e: KeyboardEvent): ReturnType<typeof keyHandler> => keyHandler(e, SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
				aria-selected={sort === SortEnum.Price}
				aria-labelledby='sort sortPrice'
			>
				{sort === SortEnum.Price && <SortIcon className={styles.sortIcon} />} По ціні
			</button>
		</div>
	);
};
