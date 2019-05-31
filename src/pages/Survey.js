import React from 'react';
import DragSort from './components/DragSort'
import Shake from './components/Shake'
import QuestionItem from './components/QuestionItem'
import QuestionWrap from './components/QuestionWrap'
import { uuid } from '../../util/util'
export default class Survey extends React.PureComponent {
	constructor(props) {
		super(props);
		this.editorsEl = [];
		this.scaleId = '';
		this.sign = false;
		this.questionTypes = [
			{
				name: "选择题",
				type: 0,
				value: [
					{ name: "单选题", type: "radio" }, { name: "多选题", type: "checkbox" }, { name: "图片选择", type: "image" }, { name: "下拉题", type: "select" }
				]
			},
			{
				name: "填空题",
				type: 1,
				value: [
					{ name: "单项填空", type: "blank" }, { name: "多项填空", type: "multiple_blank" }
				]
			},
		]
	}

	state = {
		editorsEl: [],
		editors: [],
		isEditor: false,
		hasEditing: false,
		optionShake: [],
		hasOption: [],
		hasTitle: true,
		inputShake: false,
		questionnairTitle: '问卷标题',
		curMoveItem: null,
		drag: false,
		scrollTo: 0,
		newEditor: true,
	}

	componentDidMount() {

	}


	componentWillReceiveProps(nextProps) {

		if (nextProps.editor.editorShake !== this.props.editor.editorShake) {
			this.setState({
				editor: {
					...this.state.editor,
					editorShake: nextProps.editor.editorShake,
				},
			});
		} else {
			this.setState({
				editor: {
					...this.state.editor,
					...nextProps.editor,
				},
			});
		};
	}

	editorsEl() {

	}

	isThereEditor = () => {
		const activeEditorIndex = this.state.editors.findIndex(data => data.isEditor === true);
		if (activeEditorIndex !== -1) {
			let editors = JSON.parse(JSON.stringify(this.state.editors));
			editors[activeEditorIndex].editorShake = uuid();
			this.setState({
				editors,
			});
			return true;
		} else {
			return false;
		};
	}

	createEditor(item) {
		let { type, name } = item;
		if (this.isThereEditor()) {
			return;
		}
		const editor = {
			questionId: uuid(), //id
			type: type, //类型
			name: name,
			title: '题目', //题目
			required: false, //是否必填
			remark: false, //是否有备注
			remarkText: '', //备注内容
			options: ['选项1', '选项2'], //选项(只有radio,checkbox,select有,其余尽量给个空数组)
			rows: 1, //选项占的行数
			textareaHeight: 3, //多行文本高度
			maxLength: 50, //单行文本限制的字数
			otherOption: false, //是否有其他选项
			otherOptionForwards: '其他', //”其他“项文本(前)
			otherOptionBackwards: '', //”其他“项文本(后)
			completionForwards: '题目：', //填空题文本(前)
			completionBackwards: '', //填空题文本(后)
			isEditor: true, //编辑状态还是已编辑状态
			isFirst: true, //是否是新创建的
			editorShake: '',
		};
		this.setState(prevState => ({
			editor,
			hasEditing: true,
			editors: [...prevState.editors, editor],
		}));
	}

	//新增选项
	createOption = (index) => {
		let prevState = this.state
		let editor = {
			...prevState.editor,
			'options': [...prevState.editor.options, ''],
		};
		prevState.editors[index] = editor;
		this.setState(prevState => ({
			editor,
			editors: [...prevState.editors]
		}));
	}

	delOption(index) {
		let options = this.state.editor.options
		options.splice(index, 1);
		this.setState(prevState => ({
			editor: {
				...prevState.editor,
				options,
			},
		}));
	}

	handleChange(e, editorIndex, OptIndex) {
		let value = e.target ? e.target.value : e;
		let finaVal = '';
		let key = e.target.name;
		let { editor: preEditor, editors: preEditors, hasOption } = this.state;
		if (key === 'title' && value) {
			finaVal = value;
			this.setState({
				hasTitle: true,
			});
		};
		if (key == "options") {
			let {
				options
			} = preEditor;
			hasOption[OptIndex] = true;
			let optionsTemp = options.concat();
			optionsTemp[OptIndex] = value;
			finaVal = optionsTemp;
		}
		let editor = {
			...preEditor,
			hasOption: [...hasOption],
			[key]: finaVal,
		};
		preEditors[editorIndex] = editor;
		this.setState({
			editor,
			editors: [...preEditors]
		})
	}

	handleDragMove(editors, fromI, toI) {
		this.setState({
			editors,
			curMoveItem: toI,
			drag: true
		})
	}
	handleDragEnd() {
		this.setState({
			drag: false,
			curMoveItem: null
		})
	}

	editQ(index) {
		let { editors: preEditors } = this.state;
		preEditors[index].isEditor = true;
		this.setState({
			editors: [...preEditors]
		})
	}

	copyQ(index) {
		let { editors: preEditors } = this.state;
		// let copyObj = preEditors[index]; //浅拷贝
		//深拷贝
		let copyObj = {
			...preEditors[index],
			questionId: uuid()  //可改可不该
		};
		preEditors.splice(index + 1, 0, copyObj);
		console.log(preEditors)
		this.setState({
			editors: [...preEditors]
		})
	}

	deleteQ(index) {
		let { editors: preEditors } = this.state;
		let copyObj = preEditors[index];
		preEditors.splice(index, 1);
		this.setState({
			editors: [...preEditors]
		})
	}

	cancel = (index) => {
		let { editors: preEditors } = this.state;
		preEditors[index].isFirst ? preEditors.pop() : preEditors[index].isEditor = false;
		this.setState({
			editors: [...preEditors]
		})
	}

	ok = (index) => {
		let { editors: preEditors, editor } = this.state;
		if (!editor.title) {
			this.setState(prevState => ({
				inputShake: !prevState.inputShake,
				hasTitle: false,
			}));
			return;
		};
		let empty = editor.options.some((item, ind) => {
			if (item === '') {
				this.setState(prevState => {
					prevState.optionShake[ind] = !prevState.optionShake[ind];
					prevState.hasOption[ind] = false;
					return {
						optionShake: [...prevState.optionShake],
						hasOption: [...prevState.hasOption],
					}
				})
				return true;
			}
		})
		if (empty) return;
		preEditors[index].isEditor = false;
		preEditors[index].isFirst = false;
		this.setState({
			editors: [...preEditors],
			hasEditing: false,
		})
		this.isFirst = false;
	}

	render() {
		let { questionTypes } = this
		let { editors, editor, optionShake, inputShake, hasTitle, hasOption, hasEditing, drag, curMoveItem } = this.state;
		const isFirst = editors.length !== 0 && editors[editors.length - 1].isFirst;
		// const hasEditor = editors.some(data => data.isEditor === true);
		// const canDrag = hasEditor ? false : true;
		const canDrag = hasEditing ? false : true;
		const editorsEl = editors.map((item, i) => {
			let { isEditor, editorShake } = item
			return isEditor ?
				<Shake shake={editorShake} key={i}>
					<QuestionItem
						key={i}
						optionShake={optionShake}
						inputShake={inputShake}
						hasTitle={hasTitle}
						hasOption={hasOption}
						dataIndex={i}
						editor={editor}
						item={item}
						drag={drag}
						curMoveItem={curMoveItem}
						createOption={this.createOption.bind(this, i)}
						delOption={this.delOption.bind(this)}
						handleChange={this.handleChange.bind(this)}
						onCancel={this.cancel.bind(this, i)}
						onOK={this.ok.bind(this, i)}
					></QuestionItem>
				</Shake> : <div className="drag-wrapper" key={i}>
					<QuestionItem
						key={i}
						optionShake={optionShake}
						inputShake={inputShake}
						hasTitle={hasTitle}
						hasOption={hasOption}
						dataIndex={i}
						editor={editor}
						item={item}
						drag={drag}
						curMoveItem={curMoveItem}
						onCancel={this.cancel.bind(this, i)}
						onOK={this.ok.bind(this, i)}
						editQ={this.editQ.bind(this)}
						copyQ={this.copyQ.bind(this)}
						deleteQ={this.deleteQ.bind(this)}
					></QuestionItem>
				</div>

		})
		return (<div className="survey">
			<div className="question_type_wrap">
				{
					questionTypes.map((item, i) => {
						return <dl key={i}>
							<dt>{item.name}</dt>
							<dd className="wrap">
								{
									item.value.map((item, i) => {
										return <label key={i} onClick={this.createEditor.bind(this, item)}><i className={`icon_type icon_type_${item.type}`}></i>{item.name}</label>
									})
								}
							</dd>
						</dl>
					})
				}
			</div>
			<div className="survey_main_wrap">
				<QuestionWrap
					isFirst={isFirst}>
					<DragSort
						draggable={canDrag}
						data={editors}
						onDragEnd={this.handleDragEnd.bind(this)}
						onDragMove={this.handleDragMove.bind(this)}>
						{editorsEl}
					</DragSort>
				</QuestionWrap>
			</div>
			<div className="setting_main_wrap"></div>
		</div>

		)
	}
}
