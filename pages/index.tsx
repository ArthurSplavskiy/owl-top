import { Htag, Button, P, Tag, Rating, Input } from '../components';
import { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>heading</Htag>
			<Button appearance='primary'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<P>text</P>
			<Tag color='red'>hh.ua</Tag>
			<Tag color='ghost'>hh.ua</Tag>
			<Tag color='green'>hh.ua</Tag>
			<Tag color='grey'>hh.ua</Tag>
			<Tag color='primary' href='https://youtube.com'>YouTube</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
			<Input />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	});

	return {
		props: { menu, firstCategory }
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number
}
