import React from 'react';
import styles from './ListItem.module.sass';

interface ListItemProps {
	label: string | JSX.Element;
	item: any;
	onClick(event: React.MouseEvent, item: any): void;
}

export function ListItem(props: ListItemProps): JSX.Element {
	const { label, item, onClick } = props;

	return (
		<div onClick={(e) => onClick(e, item)} className={styles.item}>
			{label}
		</div>
	);
}
