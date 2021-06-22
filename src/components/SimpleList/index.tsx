import React from 'react';

import styles from './SimpleList.module.sass';
import { ListItem } from './ListItem';
import emptySvg from 'assets/empty.svg';

export interface Row {
	id: string | number;
	label: string | JSX.Element;
	item: any;
}

interface SimpleListProps {
	header?: string | JSX.Element;
	data: Row[];
	emptyListMsg?: string;
	onRowClick?(event: React.MouseEvent, item: any): void;
}

export function SimpleList(props: SimpleListProps): JSX.Element {
	const {
		header,
		data,
		emptyListMsg,
		onRowClick
	} = props;

	return (
		<div className={styles.listContainer}>
			{header &&
				<h3 className={styles.listHeader}>{header}</h3>
			}
			<div className={styles.listContent}>
				{data.length > 0
					?  data.map((r: Row) =>
						<ListItem key={r.id} label={r.label} item={r.item} onClick={onRowClick} />
					)
					: emptyListMsg && (
						<div className={styles.emptyListContainer}>
							<h3>{emptyListMsg}</h3>
							<img className={styles.emptyListSvg} src={emptySvg} alt="List is empty" />
						</div>
					)
				}
			</div>
		</div>
	);
}
