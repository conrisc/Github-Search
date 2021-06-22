import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import styles from './UserBrowser.module.sass';
import { SearchBar } from 'components/SearchBar';
import { SimpleList, Row } from 'components/SimpleList';
import { UserDetails } from 'components/UserDetails';
import { useUsers } from 'hooks/useUsers';
import { User } from 'types/User';
import { Spinner } from 'components/Spinner';

export function UserBrowser(): JSX.Element {
	const [username, setUsername] = useState<string>('');
	const { users, loading } = useUsers(username);
	const { path } = useRouteMatch();
	const history = useHistory();

	const onSearch = (newUsername: string) => {
		history.push(path);
		setUsername(newUsername);
	};

	const onRowClick = (event: React.MouseEvent, user: User) => {
		history.push(`${path}/${user.login}`);
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
					: (
						<Switch>
							<Route exact path={path}>
								<SimpleList data={userListRows} onRowClick={onRowClick} emptyListMsg={emptyListMsg} />
							</Route>
							<Route path={`${path}/:login`}>
								<UserDetails />
							</Route>
						</Switch>
					)
				}
			</div>
		</div>
	);
}
