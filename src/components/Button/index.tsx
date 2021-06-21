import React from 'react';
import styles from './Button.module.sass';

interface ButtonProps {
	label: string;
	onClick(event?: React.SyntheticEvent): void;
}

export function Button(props: ButtonProps): JSX.Element {
	const {
		label,
		onClick,
	} = props;

	return (
		<button role="button" className={styles.button} onClick={onClick}>{label}</button>
	);
}
