/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

const ProfileGithub = ({ username }) => {
	const githubConfig = {
		clientId: "b8f464fdaca965948109",
		clientSecret: "529a161c81f4ca11f682977d494cca2d29bb0ab6",
		count: 5,
		sort: "created: asc",
	};

	const reposRef = useRef();

	const [repos, setRepos] = useState([]);

	useEffect(() => {
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${githubConfig.count}&sort=${githubConfig.sort}&client_id=${githubConfig.clientId}&client_secret=${githubConfig.clientSecret}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (reposRef) {
					setRepos(data);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const repoItems = repos.map((repo) => (
		<div key={repo.id} className="card card-body mb-2">
			<div className="row">
				<div className="col-md-6">
					<h4>
						<a
							href={repo.html_url}
							className="text-info"
							target="_blank"
							rel="noopener noreferrer"
						>
							{repo.name}
						</a>
					</h4>
					<p>{repo.description}</p>
				</div>
				<div className="col-md-">
					<span className="badge badge-info mr-1">
						Stars: {repo.stargazers_count}
					</span>
					<span className="badge badge-secondary mr-1">
						Watchers: {repo.watchers_count}
					</span>
					<span className="badge badge-success">Forks: {repo.forks_count}</span>
				</div>
			</div>
		</div>
	));
	return (
		<div ref={reposRef}>
			<hr />
			<h3 className="mb-4">Latest Github Repos</h3>
			{repoItems}
		</div>
	);
};

export default ProfileGithub;
