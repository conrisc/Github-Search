import React, { useState } from 'react';

import { SearchBar } from 'components/SearchBar';
import { SimpleList, Row } from 'components/SimpleList';
import { useUsers } from 'hooks/useUsers';
import { User } from 'types/User';

export function UserBrowser(): JSX.Element {
	const [username, setUsername] = useState<string>('');
	const { users, loading } = useUsers(username);

	const onSearch = (newUsername: string) => {
		setUsername(newUsername);
	};

	const onRowClick = (event: React.MouseEvent, user: User) => {
		alert('Clicked user: ' + user.login);
	};

	const userListRows: Row[] = users.map(
		(user: User) => ({
			id: user.id,
			label: user.login,
			item: user,
		})
	);

	return (
		<div>
			<SearchBar onSearch={onSearch} />
			{loading
				? <p>Loading users...</p>
				: <SimpleList data={userListRows} onRowClick={onRowClick} />
			}
		</div>
	);
}
