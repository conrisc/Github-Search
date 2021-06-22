import { useEffect, useState } from 'react';

import { UserDetails } from 'types/User';

interface UserResult {
	user: UserDetails | undefined;
	loading: boolean;
	error: boolean;
}

const endpoint = 'https://api.github.com/users/';

export function useUser(username: string = ''): UserResult {
	const [user, setUser] = useState<UserDetails | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	// just to be, but in real app it should be something more sophisticated
	function validateResponse(data: any) {
		return data instanceof Object && typeof data.login === 'string';
	}

	useEffect(() => {
		if (!username) return;

		const url = new URL(endpoint + username);

		setLoading(true);
		fetch(url.toString())
			.then(async (r: Response) => {
				const usersData: UserDetails = await r.json();

				if (!validateResponse(usersData)) {
					throw 'The response is incorrect';
				}

				setUser(usersData);
				setError(false);
			})
			.catch(() => {
				console.error('Couldn\'t fetch the user');
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});

	}, [username]);

	return {
		user,
		loading,
		error
	};
}
