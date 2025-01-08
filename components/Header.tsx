'use client';

import {
	ClerkLoaded,
	SignedIn,
	SignInButton,
	UserButton,
	useUser,
} from '@clerk/nextjs';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import Form from 'next/form';
import Link from 'next/link';
import { Button } from './ui/button';

export const Header = () => {
	const { user } = useUser();

	const createClerkPasskey = async () => {
		try {
			const response = await user?.createPasskey();
			console.log(response);
		} catch (err) {
			console.error('Error:', JSON.stringify(err, null, 2));
		}
	};

	return (
		<header className='flex flex-wrap justify-between items-center px-4 py-2'>
			<div className='flex flex-wrap justify-between items-center w-full'>
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

				<div className='flex flex-1 sm:flex-none items-center space-x-4 mt-4'>
					<Link
						href='/basket'
						className='flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded'
					>
						<TrolleyIcon className='w-6 h-6' />
						{/* Span item count once global state is implemented */}
						<span>My Basket</span>
					</Link>

					{/* User area */}
					<ClerkLoaded>
						<SignedIn>
							<Link
								href='/orders'
								className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded'
							>
								<PackageIcon className='w-6 h-6' />
								<span>My Orders</span>
							</Link>
						</SignedIn>

						{user ? (
							<div className='flex items-center space-x-2'>
								<UserButton />

								<div className='hidden sm:block text-xs'>
									<p className='text-gray-400'>Welcome back</p>
									<p className='font-bold'>{user.fullName}!</p>
								</div>
							</div>
						) : (
							<SignInButton mode='modal' />
						)}

						{user?.passkeys.length === 0 && (
							<Button
								onClick={createClerkPasskey}
								className='bg-white hover:bg-green-700 animate-pulse text-green-500 font-bold px-4 py-2 rounded border-green-300 border'
							>
								Generate passkey
							</Button>
						)}
					</ClerkLoaded>
				</div>
			</div>
		</header>
	);
};
