import React from 'react';

import styles from './UserDetails.module.sass';
import { SimpleList, Row } from 'components/SimpleList';
import { Spinner } from 'components/Spinner';
import { useUser } from 'hooks/useUser';
import { useRepos } from 'hooks/useRepos';
import { User } from 'types/User';
import { RepoDetails } from 'types/Repo';
import { openInNewTab } from 'utils/openInNewTab';
import booksIcon from 'assets/booksIcon.svg';

interface UserDetailsProps {
	user: User;
}

const repoComparator = (r1: RepoDetails, r2: RepoDetails) => r1.stargazers_count < r2.stargazers_count ? 1 : -1;

export function UserDetails(props: UserDetailsProps): JSX.Element {
	const { user } = props;
	const { user: userDetails, loading: loadingUserDetails } = useUser(user.login);
	const { repos, loading: loadingUserRepos } = useRepos(user.login);

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
