import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<div className={cn(styles.inputWrapper, className)}>
			<input className={cn(styles.input, {
				[styles.error]: error
			})} {...props} ref={ref} />
			{error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});
