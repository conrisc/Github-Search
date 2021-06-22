import React from 'react';

import styles from './Spinner.module.sass';

export function Spinner(): JSX.Element {
	return <div className={styles.spinner} aria-label="Loading"></div>;
}
