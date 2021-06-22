import React from 'react';
import { render } from '@testing-library/react';
import { User, UserDetails } from 'types/User';
import { RepoDetails } from 'types/Repo';

const userMock: User = {
	id: 716,
	login: 'HelloUserTest',
	avatar_url: 'nice_avatar_url',
	repos_url: 'all_repos_url',
};

const userDetailsMock: UserDetails = {
	...userMock,
	name: 'User Test',
	bio: 'My beautiful description',
};

const reposMock: RepoDetails[] = [
	{
		id: 17,
		name: 'Repo nr 1',
		html_url: 'link to repo #1',
		stargazers_count: 8,
	},
	{
		id: 19,
		name: 'Repo nr 2',
		html_url: 'link to repo #2',
		stargazers_count: 32,
	},
	{
		id: 27,
		name: 'Repo nr 3',
		html_url: 'link to repo #3',
		stargazers_count: 78,
	},
	{
		id: 81,
		name: 'Repo nr 4',
		html_url: 'link to repo #4',
		stargazers_count: 25,
	},
	{
		id: 91,
		name: 'Repo nr 5',
		html_url: 'link to repo #5',
		stargazers_count: 816,
	}
];

beforeAll(() => {
	jest.spyOn(window, 'fetch');
});

beforeEach(() => {
	jest.resetModules();
	jest.resetAllMocks();
	(window.fetch as jest.Mock).mockImplementation((url: string) => url.match('repos')
		? Promise.resolve({
			json: () => Promise.resolve(reposMock)
		})
		: Promise.resolve({
			json: () => Promise.resolve(userDetailsMock)
		})

	);
});

afterEach(() => {
	jest.resetModules();
	jest.clearAllMocks();
});

describe('UserDetails component', () => {
	test('should show loading indicator when user details are fetched', () => {
		jest.doMock('hooks/useUser', () => ({
			useUser: () => ({ loading: true, user: {} })
		}));
		jest.doMock('hooks/useRepos', () => ({
			useRepos: () => ({ loading: false, repos: [] })
		}));

		return import('.').then(({ UserDetails: UserDetailsComponent }) => {
			const { getByLabelText } = render(<UserDetailsComponent user={userMock} />);

			getByLabelText('Loading');
		});
	});

	test('should show loading indicator when user repos are fetched', () => {
		jest.doMock('hooks/useUser', () => ({
			useUser: () => ({ loading: false, user: {} })
		}));
		jest.doMock('hooks/useRepos', () => ({
			useRepos: () => ({ loading: true, repos: [] })
		}));

		return import('.').then(({ UserDetails: UserDetailsComponent }) => {
			const { getByLabelText } = render(<UserDetailsComponent user={userMock} />);

			getByLabelText('Loading');
		});
	});
});
