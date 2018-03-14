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

class MessageRent extends React.Component<WithStyles<keyof typeof styles>, State> {
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
                    getAllSites(
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
                        sites{
                            id,
                            applicant,
                            telPhone,
                            activityName,
                            eventDate,
                            startTime,
                            endTime:,
                            peopleScale,
                            siteSelection,
                            equipment,
                            activityIntroduce,
                            mainGuest,
                            plansMedia,
                            descr,
                            collapse,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const data = response.data.data.getAllSites;
                this.setState({
                    list: data.sites,
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
                    getAllSites(
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
                        sites{
                            id,
                            applicant,
                            telPhone,
                            activityName,
                            eventDate,
                            startTime,
                            endTime:,
                            peopleScale,
                            siteSelection,
                            equipment,
                            activityIntroduce,
                            mainGuest,
                            plansMedia,
                            descr,
                            collapse,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const res = response.data.data.getAllSites;
                this.setState({
                    list: res.sites,
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
                <h4 className="title">场地租用</h4>
                <Paper className="root-paper">
                    <div className="table-hidden">
                        <ul className="table-head">
                            <li />
                            <li>申请人</li>
                            <li>手机</li>
                            <li>活动名称</li>
                            <li>活动日期</li>
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
                                            <div>{n.applicant}</div>
                                            <div>{n.telPhone}</div>
                                            <div>{n.activityName}</div>
                                            <div>{new Date(n.eventDate).toLocaleDateString()}</div>
                                        </div>
                                        <Collapse
                                            in={n.collapse}
                                            timeout="auto"
                                            unmountOnExit
                                            className="collapse-msg"
                                        >
                                            <span>活动开始时间：{new Date(n.startTime).toLocaleDateString()}</span>
                                            <span>活动结束时间：{new Date(n.endTime).toLocaleDateString()}</span>
                                            <span>人数规模：{n.peopleScale}</span>
                                            <span>场地选择：{n.siteSelection}</span>
                                            <span>借用设备登记：{n.equipment}</span>
                                            <span>活动介绍：{n.activityIntroduce}</span>
                                            <span>嘉宾信息：{n.mainGuest}</span>
                                            <span>拟邀媒体：{n.plansMedia}</span>
                                            <span>备注说明：{n.descr}</span>
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
export default withStyles(styles)(MessageRent);