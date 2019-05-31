import React from 'react';
import Header from './components/Header'

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.types = [{ name: "题型", url: "#/survey" }, { name: "外观", url: "#/appearance" }, { name: "逻辑", url: "#/logic" }]
		this.state = {
			currentIndex: 0
		}

	}

	componentDidMount() {

	}

	changeType(i) {
		this.setState({
			currentIndex: i
		})
	}

	render() {
		let { types } = this
		let { currentIndex } = this.state
		return <div className="main_wrap">
			<Header />
			<div className="main">
				<div className="left_nav">
					<ul>
						{
							types.map((item, i) => {
								return <li className="left_nav_item" key={i} onClick={this.changeType.bind(this, i)}><a href={item.url}><div className={i == currentIndex ? "blue_icon" : ""}><i></i></div>{item.name}</a></li>
							})
						}
					</ul>
				</div>
				<div className="right_con">
					{
						React.Children.map(this.props.children, (element) => {
							return React.cloneElement(element, {})
						})
					}
				</div>

			</div>
		</div>


	}
}