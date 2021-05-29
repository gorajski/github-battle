import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'

//Component is concerned with:
//. State
//. Lifecycle
//. UI

class App extends React.Component {
	render() {
		return (
			<div className='container'>
				<Popular />
			</div>
		)
	}
}

ReactDOM.render(
	// ReactElement,
	// Where to render the ELement to
	<App />,
	document.getElementById('app')
)