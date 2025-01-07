'use client';

import { useUser } from '@clerk/nextjs';
import { TrolleyIcon } from '@sanity/icons';
import Form from 'next/form';
import Link from 'next/link';

export const Header = () => {
	const { user } = useUser();

	return (
		<header className='flex flex-wrap justify-between items-center px-4 py-2'>
			<div>
				<Link
					href='/'
					className='text-2xl font-bold text-green-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'
				>
					Buy Cheap
				</Link>

				<Form
					action='/search'
					className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'
				>
					<input
						type='text'
						name='query'
						placeholder='Search for products'
						className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border w-full max-w-4xl'
					/>
				</Form>

				<div>
					<Link
						href='/basket'
						className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded'
					>
						<TrolleyIcon className='w-6 h-6' />
						{/* Span item count once global state is implemented */}
						<span>My Basket</span>
					</Link>
				</div>
			</div>
		</header>
	);
};
