import React from 'react';
import Header from './components/Header'

export default class Home extends React.Component {
	constructor(props) {
		super(props);

	}

	
	render() {
		return <div className="main_wrap">
			<Header />
			<div className="content">
				{
					React.Children.map(this.props.children, (element) => {
						return React.cloneElement(element, {})
					})
				}
			</div>
			
		</div>


	}
}