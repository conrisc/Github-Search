import { useEffect, useState } from 'react';

import { UsersData, User } from 'types/User';

interface UsersResult {
	users: User[];
	loading: boolean;
}

const endpoint = 'https://api.github.com/search/users';

export function useUsers(username: string = ''): UsersResult {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!username) return;

		const url = new URL(endpoint);
		url.search = new URLSearchParams({ q: username }).toString();

		setLoading(true);
		fetch(url.toString())
			.then(async (r: Response) => {
				const usersData: UsersData = await r.json();
				setUsers(usersData.items);
			})
			.catch(() => {
				console.error('Couldn\'t fetch users');
			})
			.finally(() => {
				setLoading(false);
				console.log('Current users: ', users);
			});

	}, [username]);

	return {
		users,
		loading,
	};
}
