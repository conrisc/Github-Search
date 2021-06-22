import { useEffect, useState } from 'react';

import { UserDetails } from 'types/User';

interface UserResult {
	user: UserDetails | undefined;
	loading: boolean;
}

const endpoint = 'https://api.github.com/users/';

export function useUser(username: string = ''): UserResult {
	const [user, setUser] = useState<UserDetails | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!username) return;

		const url = new URL(endpoint + username);

		setLoading(true);
		fetch(url.toString())
			.then(async (r: Response) => {
				const usersData: UserDetails = await r.json();
				setUser(usersData);
			})
			.catch(() => {
				console.error('Couldn\'t fetch the user');
			})
			.finally(() => {
				setLoading(false);
			});

	}, [username]);

	return {
		user,
		loading,
	};
}
