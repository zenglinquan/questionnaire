import React from 'react'

export default class QuestionWrap extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        if (this.scrollBottom) {
            const scrollHeight = this.box.scrollHeight;
            this.page.scrollTo(0, scrollHeight);
        };
        if (this.scrollTo) {
            this.page.scrollTo(0, 500);
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFirst) {
            this.scrollBottom = true;
        } else {
            this.scrollBottom = false;
        };
        if (nextProps.scrollTo !== this.props.scrollTo) {
            this.scrollTo = nextProps.scrollTo;
        } else {
            this.scrollTo = false;
        };
    }
    render() {
        return <div className="question_wrap" ref={e => this.page = e}>
            <div className="question_box" ref={(e) => this.box = e}>
                {this.props.children || (
                    <div className='questionnair-page-default'>
                        <img src="" style={{ width: 130 }} />
                        <div className='page-default-text'>您还没有添加题目哦，请点击左侧控件开始出题吧</div>
                    </div>
                )}
            </div>

        </div>

    }
}