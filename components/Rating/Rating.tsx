import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import { useState, useEffect, useRef, KeyboardEvent, ForwardedRef, forwardRef } from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, rating, isEditable = false, setRating, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

	const computeFocus = (r: number, i: number): number => {
		if(!isEditable) {
			return -1;
		}
		if(!rating && i === 0) {
			return tabIndex ?? 0;
		}
		if(r === i + 1) {
			return tabIndex ?? 0;
		}
		return -1;
	};

	const constructRating = (currentRating: number): void => {
		const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable
						})}
						onMouseEnter={(): void => changeDisplay(i + 1)}
						onMouseLeave={(): void => changeDisplay(rating)}
						onClick={(): void => onClickChangeDisplay(i + 1)}
						tabIndex={computeFocus(rating, i)}
						onKeyDown={handleKey}
						ref={(r): number => ratingArrayRef.current?.push(r)}
						role={isEditable ? 'slider' : ''}
						aria-valuenow={rating}
						aria-valuemin={1}
						aria-valuemax={5}
						aria-label={isEditable ? 'Визначте рейтинг' : 'рейтинг' + rating}
						aria-invalid={error ? true : false}
				>
					<StarIcon />
				</span>
			);
		});
		setRatingArray(updateArray);
	};

	const changeDisplay = (i: number): void => {
		if(!isEditable) return;
		constructRating(i);
	};

	const onClickChangeDisplay = (i: number): void => {
		if(!isEditable || !setRating) return;
		setRating(i);
	};

	const handleKey = (e: KeyboardEvent<HTMLSpanElement>): void => {
		if(!isEditable || !setRating) return;
		if(e.code === 'ArrowRight' || e.code === 'ArrowUp') {
			if(!rating) {
				setRating(1);
			} else {
				e.preventDefault();
				setRating(rating < 5 ? rating + 1 : 5);
			}
			ratingArrayRef.current[rating]?.focus();
		}
		if(e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
			e.preventDefault();
			setRating(rating > 1 ? rating - 1 : 1); 
			ratingArrayRef.current[rating - 2]?.focus();
		}
	};

	useEffect(() => {
		constructRating(rating);
	}, [rating, tabIndex]);

	return (
		<div {...props} ref={ref} className={cn({
			[styles.error]: error
		})}>
			{ratingArray.map((r, i) => <span key={i}>{r}</span>)}
		</div>
	);
});
