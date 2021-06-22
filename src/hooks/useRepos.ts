import { useEffect, useState } from 'react';

import { RepoDetails } from 'types/Repo';

interface UserResult {
	repos: RepoDetails[];
	loading: boolean;
	error: boolean;
}

const endpoint = 'https://api.github.com/users/{owner}/repos';

export function useRepos(username: string = ''): UserResult {
	const [repos, setRepos] = useState<RepoDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	// just to be, but in real app it should be something more sophisticated
	function validateResponse(data: any) {
		return data instanceof Array &&
			(data.length === 0 || typeof data[0].name === 'string');
	}

	useEffect(() => {
		if (!username) return;

		const url = new URL(endpoint.replace('{owner}', username));

		setLoading(true);
		fetch(url.toString())
			.then(async (r: Response) => {
				const reposData: RepoDetails[] = await r.json();

				if (!validateResponse(reposData)) {
					throw 'The response is incorrect';
				}

				setRepos(reposData);
				setError(false);
			})
			.catch(() => {
				console.error(`Couldn't fetch repositories for user ${username}`);
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});

	}, [username]);

	return {
		repos,
		loading,
		error,
	};
}
