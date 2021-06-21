import React from 'react';
import styles from './SimpleList.module.sass';

import { ListItem } from './ListItem';

export interface Row {
	id: string | number;
	label: string | JSX.Element;
	item: any;
}

interface SimpleListProps {
	header?: string | JSX.Element;
	data: Row[];
	onRowClick(event: React.MouseEvent, item: any): void;
}

export function SimpleList(props: SimpleListProps): JSX.Element {
	const { header, data, onRowClick } = props;

	return (
		<div className={styles.listContainer}>
			{header &&
				<div className={styles.listHeader}>{header}</div>
			}
			<div className={styles.listContent}>
				{data.map((r: Row) =>
					<ListItem key={r.id} label={r.label} item={r.item} onClick={onRowClick} />
				)}
			</div>
		</div>
	);
}
