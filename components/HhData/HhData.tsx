import styles from './HhData.module.css';
import { HhDataProps } from './HhData.props';
import { Card } from '../Card/Card';
import cn from 'classnames';
import RateIcon from './rate.svg';
import { price } from '../../helpers/helpers';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
	
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всього вакансій</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Початковий</div>
					<div className={styles.salaryValue}>{price(juniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Середній</div>
					<div className={styles.salaryValue}>{price(middleSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Професіонал</div>
					<div className={styles.salaryValue}>{price(seniorSalary)}</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	);
};
