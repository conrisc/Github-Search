import { useEffect, useState } from 'react';

import { RepoDetails } from 'types/Repo';

interface UserResult {
	repos: RepoDetails[];
	loading: boolean;
}

const endpoint = 'https://api.github.com/users/{owner}/repos';

export function useRepos(username: string = ''): UserResult {
	const [repos, setRepos] = useState<RepoDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!username) return;

		const url = new URL(endpoint.replace('{owner}', username));

		setLoading(true);
		fetch(url.toString())
			.then(async (r: Response) => {
				const usersData: RepoDetails[] = await r.json();
				setRepos(usersData);
			})
			.catch(() => {
				console.error(`Couldn't fetch repositories for user ${username}`);
			})
			.finally(() => {
				setLoading(false);
			});

	}, [username]);

	return {
		repos,
		loading,
	};
}
