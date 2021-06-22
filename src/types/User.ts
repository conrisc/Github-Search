export interface UsersData {
	total_count: number;
	items: User[];
}

export interface User {
	id: number;
	login: string;
	avatar_url: string;
	repos_url: string;
}

export interface UserDetails extends User {
	name: string;
	bio: string;
}
