import React from 'react';

import styles from './UserDetails.module.sass';
import { SimpleList } from 'components/SimpleList';
import { useUser } from 'hooks/useUser';
import { User } from 'types/User';

interface UserDetailsProps {
	user: User;
}

export function UserDetails(props: UserDetailsProps): JSX.Element {
	const { user } = props;
	const { user: userDetails, loading } = useUser(user.login);

	const {
		avatar_url = '',
		name = '',
		bio = '',
	} = userDetails || {};

	return loading
		? <p>Loading user details...</p>
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
				<SimpleList data={[]} header="Top repositories" />
			</div>
		);
}
