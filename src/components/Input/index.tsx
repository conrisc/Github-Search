import React from 'react';
import styles from './Input.module.sass';

interface InputProps {
	prefix?: string | JSX.Element;
	placeholder?: string;
	defaultValue?: string;
	onChange?(event?: React.ChangeEvent<HTMLInputElement>): void;
	onKeyDown?(event?: React.KeyboardEvent): void;
}

export function Input(props: InputProps): JSX.Element {
	const { onChange, onKeyDown, prefix, placeholder, defaultValue } = props;

	return (
		<div className={styles.container}>
			{prefix &&
				<div className={styles.prefix}>{prefix}</div>
			}
			<input
				className={styles.input}
				placeholder={placeholder || ''}
				defaultValue={defaultValue || ''}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</div>
	);
}
