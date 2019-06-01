import React from 'react';
import Shake from '../Shake'
import Input from '../Input'
import ContentEditable from '../ContentEditable'
import { Tooltip, Select } from 'antd'
const { Option } = Select;
export default class QuestionItem extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    state = {
        hover: false
    }

    onMouseEnter = () => {
        this.setState({
            hover: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            hover: false
        })
    }

    disableEnter = (event) => {
        if (event.which == 13) {
            event.cancelBubble = true;
            event.preventDefault();
            event.stopPropagation();
        };
    }

    componentDidMount() {

    }

    render() {
        let { dataIndex, editor, optionShake,
            inputShake, hasTitle, hasOption,
            createOption, handleChange, delOption,
            editQ, copyQ, deleteQ
        } = this.props
        let { isEditor, options, name, title, type } = this.props.item
        let { hover } = this.state
        return <div className={isEditor ? "question  question_focus" : "question question_hover"}>
            <div className="q_content_wrap"
                style={hover && !isEditor ? { backgroundColor: "#fafafa", cursor: "move" } : {}}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}>
                <div className="q_content"	>
                    <div className="q_type">{name}</div>
                    <div className="q_title_wrap">
                        <div className="q_seq">{dataIndex + 1}</div>
                        <div className={isEditor ? "content_editable" : ""}>
                            <div className="q_title" >
                                {
                                    isEditor ? <Shake shake={inputShake}>
                                        <ContentEditable
                                            contentEditable={isEditor}
                                            html={title}
                                            index={dataIndex}
                                            name='title'
                                            style={{
                                                borderColor: hasTitle ? '' : "red"
                                            }}
                                            onChange={(e) => {
                                                handleChange(e, dataIndex)
                                            }}
                                            onKeyPress={this.disableEnter}
                                        />
                                    </Shake> : <div>{title}</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="q_desc_wrap none">
                        <div className="content_editable">
                            <div className="q_desc" ></div>
                        </div>
                    </div>

                    <div className="q_option_list">
                        <ul className="q_option_ul ui-sortable" >
                            {
                                type == "select" && !isEditor ?
                                    <Select defaultValue={options[0]}>
                                        {
                                            options.map((item, i) => {
                                                return <option key={i}>{item}</option>
                                            })
                                        }
                                    </Select>
                                    : null
                            }
                            {
                                options.map((item, i) => {
                                    return <li className="option_item" key={i}>
                                        <div className="option_title_wrap">
                                            {/* <i className="icon_hover"></i> */}
                                            {
                                                isEditor ? <div className="content_editable">
                                                    <i className={"icon_base icon_option_" + type}></i>
                                                    <div className="option_title" >
                                                        <Shake shake={optionShake[i]}>
                                                            <Input
                                                                type='text'
                                                                index={i}
                                                                placeholder={item}
                                                                name='options'
                                                                // value={item}
                                                                maxLength={50}
                                                                onChange={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    handleChange(e, dataIndex, i)
                                                                }}
                                                                style={{
                                                                    borderColor: hasOption[i] === false ? 'red' : ''
                                                                }}
                                                            />
                                                        </Shake>
                                                    </div>
                                                    <i className="icon_operate operation_delete"
                                                        onClick={() => {
                                                            delOption(i)
                                                        }}
                                                    ></i>
                                                </div>
                                                    : <div>
                                                        {
                                                            type == "radio" || type == "checkbox" ? <div>
                                                                <input type={type} name="options"></input>
                                                                <span className="option_value">{item}</span>
                                                            </div> : null
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    {
                        isEditor ? <div className="q_option_operate">
                            <a className="btn_text_icon btn_add_single" onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                createOption();
                            }}>
                                <i className="icon_operate icon_add"></i>添加单个选项</a>
                            <a className="btn_text_icon btn_add_more" >
                                <i className="icon_operate icon_add_more"></i>批量添加选项</a>
                            <a className="btn_text_icon btn_add_other">
                                <i className="icon_operate icon_add_other"></i>添加「其他」项</a>
                        </div> : null
                    }
                </div>
            </div >
            {
                !isEditor ? <div className="q_operate">
                    < div className="q_operate_inner" >
                        <Tooltip placement="rightTop" title="编辑题目"><i className="icon_operate btn_question_edit" onClick={() => { editQ(dataIndex) }}></i></Tooltip>
                        <Tooltip placement="rightTop" title="复制题目"><i className="icon_operate btn_question_clone" onClick={() => { copyQ(dataIndex) }}></i></Tooltip>
                        <Tooltip placement="rightTop" title="删除题目"><i className="icon_operate btn_question_dele" onClick={() => { deleteQ(dataIndex) }}></i></Tooltip>
                    </div >
                </div > : null
            }
            {
                isEditor ? <div className="operation_btn">
                    <button className="done_btn" onClick={this.props.onOK}>确定</button>
                    <button className="done_btn" onClick={this.props.onCancel}>取消</button>
                </div> : null
            }
        </div >

    }
}