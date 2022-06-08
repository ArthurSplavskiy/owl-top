import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNum, price } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		visible: { opacity: 1, height: 'auto' },
		hidden: { opacity: 0, height: 0 }
	};

	const scrollToReview = (): void => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div ref={ref} className={cn(className, styles.productWrapper)} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}><img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} /></div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{price(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>{product.price - product.oldPrice}</Tag>}
				</div>
				<div className={styles.credit}>
					{price(product.credit)}/<span className={styles.month}>міс.</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>Ціна</div>
				<div className={styles.creditTitle}>Кредит</div>
				<div className={styles.rateTitle}>
					<a href="#ref" onClick={scrollToReview}>
						{product.reviewCount} {devlOfNum(product.reviewCount, ['відгук', 'відгука', 'відгуків'])}
					</a>
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => <div key={c.name} className={styles.characteristics}>
						<span className={styles.characteristicsName}>{c.name}</span>
						<span className={styles.characteristicsDots}></span>
						<span className={styles.characteristicsValue}>{c.value}</span>
					</div>)}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Переваги</div>
						{product.advantages}
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недоліки</div>
						{product.disadvantages}
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Показати більше</Button>
					<Button
						className={styles.reviewBtn}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={(): void => setIsReviewOpened(!isReviewOpened)}
						aria-expanded={isReviewOpened}
					>Читати відгуки</Button>
				</div>
			</Card>
			<motion.div
				animate={isReviewOpened ? 'visible' : 'hidden'}
				variants={variants}
				initial='hidden'
			>
				<Card color='blue' ref={reviewRef} className={cn(styles.reviews)} tabIndex={isReviewOpened ? 0 : -1}>
					{product.reviews && product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r}/>
							<Divider />
						</div>
					))}
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</div>
	);
}));
