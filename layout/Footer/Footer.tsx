import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>
				OwlTop &copy; 2020 - {format(new Date(), 'yyyy')} Всі права захищені
			</div>
			<a href="#" target="_blank">Права користувача</a>
			<a href="#" target="_blank">Політика конфеденційності</a>
		</footer>
	);
};
