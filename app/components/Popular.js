import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
// Notice that we didn't have a default export, it's just a normal export
// function, so we used our name imports here to grab that.
import Card from './Card.js'
import Loading from './Loading.js'
import Tooltip from './Tooltip'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LanguagesNav({selected, onUpdateLanguage}) {
	const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

	return (
		<ul className='flex-center'>
			{languages.map((language) => (
				<li key={language}>
					<button 
					className='btn-clear nav-link'
					style={ language === selected ? {color: 'red'} : null }
					onClick={() => (onUpdateLanguage(language))}>
						{language}
					</button>
				</li>
			))}
		</ul>
	)
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
	return (
		<ul className='grid space-around'>
			{repos.map((repo, index) => {
				const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
				const { login, avatar_url } = owner

				return (
					<li key={html_url}>
						<Card
							header={`#${index + 1}`}
							avatar={avatar_url}
							href={html_url}
							name={login}
						>
							<ul className='card-list'>
								<li>
									<Tooltip text='Github Username'>
										<FaUser color='rgb(255, 191, 166)' size={22}/>
										<a href={`https://github.com/${login}`}>
											{login}
										</a>
									</Tooltip>
								</li>
								<li>
									<FaStar color='rgb(255, 215, 0)' size={22}/>
									{stargazers_count.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch color='rgb(129, 195, 245)' size={22}/>
									{forks.toLocaleString()} forks
								</li>
								<li>
									<FaExclamationTriangle color='rgb(241, 138, 147)' size={22}/>
									{open_issues.toLocaleString()} open issues
								</li>
							</ul>
						</Card>
					</li>
				)
			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLanguage: 'All',
			repos: {},
			error: null
		}

		this.updateLanguage = this.updateLanguage.bind(this)
		this.isLoading = this.isLoading.bind(this)
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage)
	}

	updateLanguage(selectedLanguage) {
		this.setState({
			selectedLanguage,
			error: null,
		})

		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then((data) => {
					this.setState(({ repos }) => ({
						repos: {
							...repos,
							[selectedLanguage]: data
						}
					}))
				})			
				.catch(() => {
					console.warn('Error fetching repos: ', error)

					this.setState({
						error: 'There was an error fetching the repositories.'
					})
				})
		}
	}

	isLoading() {
		const { selectedLanguage, repos, error } = this.state

		return !repos[selectedLanguage] && error === null
	}

	render() {
		const { selectedLanguage, repos, error } = this.state

		return(
			<React.Fragment>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				/>

				{this.isLoading() && <Loading text='Fetching Repos'/>}

				{error && <p className='center-text error'>{error}</p>}
 
				{repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
			</React.Fragment>
		)
	}
}
