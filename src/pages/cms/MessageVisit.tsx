import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import ExpandMore from 'material-ui-icons/ExpandMore';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Collapse from 'material-ui/transitions/Collapse';
import axios from 'axios';

const styles = {
    evenRow: {
        'background': '#f7f7f7',
    },
    root: {
        'padding': '40px 30px',
    },
    menuBtn: {},
};
type State = {
    rowsPerPage: number,
    currentPage: number,
    totalItems: number,
    list: Array<any>,
};

class MessageVisit extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            rowsPerPage: 0,
            currentPage: 0,
            totalItems: 0,
            list: [],
        };
    }
    componentDidMount() {
        axios.post('http://192.168.1.121:3000/graphql?', {
            query: `
                query {
                    getAllVisits(
                        limit: 10,
                        pages: 1,
                    ){
                        pagination{
                            totalItems,
                            currentPage,
                            pageSize,
                            totalPages,
                            startPage,
                            endPage,
                            startIndex,
                            endIndex,
                            pages,
                        },
                        visits{
                            id,
                            name,
                            telPhone,
                            WeChat,
                            email,
                            companyName,
                            industryInvolved,
                            employees,
                            appointmentDate,
                            collapse,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const data = response.data.data.getAllVisits;
                this.setState({
                    list: data.visits,
                    totalItems: data.pagination.totalItems,
                    rowsPerPage: data.pagination.pageSize,
                    currentPage: data.pagination.currentPage - 1,
                });
            }
        });
    }
    handlePageClick = (data: any) => {
        axios.post('http://192.168.1.121:3000/graphql?', {
            query: `
                query {
                    getAllVisits(
                        limit: 10,
                        pages: ${data.selected + 1},
                    ){
                        pagination{
                            totalItems,
                            currentPage,
                            pageSize,
                            totalPages,
                            startPage,
                            endPage,
                            startIndex,
                            endIndex,
                            pages,
                        },
                        visits{
                            id,
                            name,
                            telPhone,
                            WeChat,
                            email,
                            companyName,
                            industryInvolved,
                            employees,
                            appointmentDate,
                            collapse,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const res = response.data.data.getAllVisits;
                this.setState({
                    list: res.visits,
                    totalItems: res.pagination.totalItems,
                    rowsPerPage: res.pagination.pageSize,
                    currentPage: res.pagination.currentPage - 1,
                });
            }
        });
    };
    handleClick = (pro: any) => {
        pro.collapse = !pro.collapse;
        this.setState({
            [pro]: pro.collapse,
        });
    };
    render() {
        const { totalItems, rowsPerPage, list } = this.state;
        return (
            <div className="top-action-module cms-message">
                <p className="crumbs">
                    CMS / 信息管理
                </p>
                <h4 className="title">参观预约</h4>
                <Paper className="root-paper">
                    <div className="table-hidden">
                        <ul className="table-head">
                            <li />
                            <li>姓名</li>
                            <li>手机</li>
                            <li>微信</li>
                            <li>邮箱</li>
                        </ul>
                        <ul className="table-body">
                            {list.map((n, index) => {
                                return (
                                    <li key={n.id}>
                                        <div className={index % 2 === 0 ? this.props.classes.evenRow : ''}>
                                            <div onClick={() => this.handleClick(n)}>
                                                {
                                                    n.collapse ?
                                                        <ExpandMore
                                                            style={{
                                                                color: '#808080',
                                                                width: 20,
                                                                height: 20}}
                                                        /> :
                                                        <KeyboardArrowRight
                                                            style={{
                                                                color: '#808080',
                                                                width: 20,
                                                                height: 20}}
                                                        />
                                                }
                                            </div>
                                            <div>{n.name}</div>
                                            <div>{n.telPhone}</div>
                                            <div>{n.WeChat}</div>
                                            <div>{n.email}</div>
                                        </div>
                                        <Collapse
                                            in={n.collapse}
                                            timeout="auto"
                                            unmountOnExit
                                            className="collapse-msg"
                                        >
                                            <span>公司名称：{n.companyName}</span>
                                            <span>所属行业：{n.industryInvolved}</span>
                                            <span>公司人数：{n.employees}人</span>
                                            <span>预约日期：{new Date(n.appointmentDate).toLocaleDateString()}</span>
                                        </Collapse>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="table-pagination">
                        {
                            this.state.totalItems > 0 &&
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={<a href="javascript:;">...</a>}
                                breakClassName={'break-me'}
                                pageCount={totalItems / rowsPerPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            />
                        }
                    </div>
                </Paper>
            </div>
        );
    }
}
export default withStyles(styles)(MessageVisit);