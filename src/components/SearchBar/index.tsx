import React, { useState } from 'react';
import styles from './SearchBar.module.sass';

import { Input } from 'components/Input';
import { Button } from 'components/Button';
import searchIcon from 'assets/searchIcon.svg';

interface SearchBarProps {
	onSearch(value: string): void;
}

export function SearchBar(props: SearchBarProps): JSX.Element {
	const { onSearch } = props;

	const [searchedValue, setSearchedValue] = useState<string>('');

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.code === 'Enter') {
			search();
		}
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchedValue(value.trim());
	};

	const search = () => {
		if (searchedValue)
			onSearch(searchedValue);
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchInput} >
				<Input
					placeholder="Search github users"
					prefix={<img src={searchIcon} alt="Search" />}
					onChange={onInputChange}
					onKeyDown={onKeyDown}
				/>
			</div>
			<Button label="Search" onClick={search} />
		</div>
	);
}
