import React, { useState } from 'react';

import styles from './UserBrowser.module.sass';
import { SearchBar } from 'components/SearchBar';
import { SimpleList, Row } from 'components/SimpleList';
import { UserDetails } from 'components/UserDetails';
import { useUsers } from 'hooks/useUsers';
import { User } from 'types/User';
import { Spinner } from 'components/Spinner';

export function UserBrowser(): JSX.Element {
	const [username, setUsername] = useState<string>('');
	const [selectedUser, setSelectedUser] = useState<User | undefined>();
	const { users, loading } = useUsers(username);

	const onSearch = (newUsername: string) => {
		setSelectedUser(undefined);
		setUsername(newUsername);
	};

	const onRowClick = (event: React.MouseEvent, user: User) => {
		setSelectedUser(user);
	};

	const userListRows: Row[] = users.map(
		(user: User) => ({
			id: user.id,
			label: user.login,
			item: user,
		})
	);

	const emptyListMsg: string = username ? `We couldn't find anything like ${username}` : '';

	return (
		<div>
			<SearchBar onSearch={onSearch} />
			<div className={styles.content}>
				{loading
					? <div className="align-center"><Spinner /></div>
					: selectedUser
						? <UserDetails user={selectedUser} />
						: <SimpleList data={userListRows} onRowClick={onRowClick} emptyListMsg={emptyListMsg} />
				}
			</div>
		</div>
	);
}
