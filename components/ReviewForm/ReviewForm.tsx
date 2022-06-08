import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
	isOpened,
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');

	const onSubmit = async (formData: IReviewForm): Promise<void> => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, productId});

			if(data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Щось пішло не так');
			}
		} catch (e) {
			if(e instanceof Error) {
				setIsError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('name', {required: {value: true, message: "Заповніть ім'я"} } )}
					placeholder="Ім'я"
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input 
					{...register('title', {required: {value: true, message: "Заповніть заголовок"} } )}
					className={styles.title}
					placeholder='Заголовок відгука'
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оцінка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{
							required: true
						}}
						render={({ field }): JSX.Element => (
							<Rating
								rating={field.value}
								setRating={field.onChange}
								ref={field.ref}
								isEditable={true}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {required: {value: true, message: "Заповніть поле"} })}
					placeholder='Текст відгука'
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={(): void => clearErrors()}>Відправити</Button>
					<span className={styles.info}>* перед відправкою відгук пройде модерацію та перевірку</span>
				</div>
			</div>
			{isSuccess && !isError && <div className={cn(styles.panel, styles.success)} role='alert'>
				<div className={styles.successTitle}>Ваш відгук відправлено</div>
				<div>
					Дякуємо, ваш відгук буде опубліковано після перевірки.
				</div>
				<button
					className={styles.close}
					onClick={(): ReturnType<typeof setIsSuccess> => setIsSuccess(false)}
					aria-label='закрити вікно повідомлення'
				>
					<CloseIcon />
				</button>
			</div>}
			{isError && <div className={cn(styles.panel, styles.error)} role='alert'>
				Щось пішло не так, спробуйте пізніше
				<button
					className={styles.close} 
					onClick={(): ReturnType<typeof setIsError> => setIsError('')}
					aria-label='закрити вікно повідомлення'
				>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};
