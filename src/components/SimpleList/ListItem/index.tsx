import React from 'react';

import styles from './ListItem.module.sass';
import arrowRightIcon from 'assets/arrowRightIcon.svg';

interface ListItemProps {
	label: string | JSX.Element;
	item: any;
	onClick?(event: React.MouseEvent, item: any): void;
}

export function ListItem(props: ListItemProps): JSX.Element {
	const { label, item, onClick } = props;

	return (
		<div
			onClick={onClick ? (e) => onClick(e, item) : undefined}
			className={`${styles.item} ${onClick ? styles.clickable : ''}`}
		>
			<div className={styles.label}>
				{label}
			</div>
			<div>
				<img src={arrowRightIcon} alt="" height="24" />
			</div>
		</div>
	);
}
