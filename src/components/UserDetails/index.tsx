import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import styles from './UserDetails.module.sass';
import { SimpleList, Row } from 'components/SimpleList';
import { Spinner } from 'components/Spinner';
import { useUser } from 'hooks/useUser';
import { useRepos } from 'hooks/useRepos';
import { RepoDetails } from 'types/Repo';
import { openInNewTab } from 'utils/openInNewTab';
import booksIcon from 'assets/booksIcon.svg';

const repoComparator = (r1: RepoDetails, r2: RepoDetails) => r1.stargazers_count < r2.stargazers_count ? 1 : -1;

interface UserDetailsParams {
	login: string;
}

export function UserDetails(): JSX.Element {
	const { login } = useParams<UserDetailsParams>();
	const { user: userDetails, loading: loadingUserDetails, error: userError } = useUser(login);
	const { repos, loading: loadingUserRepos, error: reposError } = useRepos(login);
	const history = useHistory();

	if (userError || reposError) {
		history.push('/search');
	}

	const {
		avatar_url = '',
		name = '',
		bio = '',
	} = userDetails || {};

	const mostPopularRepos: Row[] = loadingUserRepos
		? []
		: repos
			.sort(repoComparator)
			.slice(0, 4)
			.map(repo => ({
				id: repo.id,
				label: (
					<>
						<img src={booksIcon} alt="Repository" />
						{repo.name}
					</>
				),
				item: repo
			}));

	const onRepoClick = (event: React.MouseEvent, repo: RepoDetails) => {
		openInNewTab(repo.html_url);
	};

	return (loadingUserDetails || loadingUserRepos)
		? <div className="align-center"><Spinner /></div>
		: (
			<div>
				<div className={styles.header}>
					<img className={styles.avatar} src={avatar_url} alt="User's avatar" />
					<h2>{name}</h2>
				</div>
				<div className={styles.description}>
					<h3>About</h3>
					<p>{bio || 'No description'}</p>
				</div>
				<SimpleList
					data={mostPopularRepos}
					header="Top repositories"
					onRowClick={onRepoClick}
					emptyListMsg={mostPopularRepos.length === 0 ? 'No repositories found' : ''}
				/>
			</div>
		);
}
