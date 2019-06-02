import React from 'react';
import Header from './components/Header'
export default class Home extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	render() {
		return <div className="home">
			<div className="search_con">
				<div className="search_tab">
					<span><i  className="icon_bg icon_card"></i></span>
					<span><i  className="icon_bg icon_list"></i></span>
				</div>
				<div className="search-select">
					<span></span>
					<span></span>
				</div>
			</div>
			<ul className="card">
				<li className="card_item">
					<a href='#/survey'><i className="icon_bg icon_add"></i>新建</a>
				</li>
				<li className="card_item">
					<p>问卷调查</p>
					<p>问卷更新时间</p>
					<p className="oparation_edit">编辑</p>
				</li>
			</ul>
		</div>
	}
}