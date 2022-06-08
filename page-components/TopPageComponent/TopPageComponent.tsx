import { useEffect, useReducer } from 'react';
import { Advantages, HhData, Htag, Tag, Sort, Product } from '../../components';
import { SortEnum } from '../../components/Sort/Sort.props';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { sortReducer } from './sort.reducer';
import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import { useScrollY } from '../../hooks/useScrollY';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, firstCategory, products}: TopPageComponentProps): JSX.Element => {
	const y = useScrollY();

	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
	const shouldReduceMotion = useReducedMotion();

	const setSort = (sort: SortEnum): void => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);

	return <div className={styles.wrapper}>
		<div className={styles.title}>
			<Htag tag='h1'>{page.title}</Htag>
			{products && <Tag color='grey' size='m' aria-label={products.length + ' елементів'}>{products.length}</Tag>}
			<Sort sort={sort} setSort={setSort} />
		</div>
		<div role='list'>
			{sortedProducts && sortedProducts.map(p => <Product role='listitem' layout={shouldReduceMotion ? false : true} key={p._id} product={p} />)}
		</div>
		<div className={styles.hhTitle}>
			<Htag tag='h2'>Вакансії - {page.category}</Htag>
			<Tag color='red' size='m'>grc.ua</Tag>
		</div>
		{firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
		{page.advantages && page.advantages.length > 0 && <>
			<Htag tag='h2'>Переваги</Htag>
			<Advantages advantages={page.advantages} />
		</>}
		{page.seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
		<Htag tag='h2'>Набуті навики</Htag>
		{page.tags && page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
	</div>;
};