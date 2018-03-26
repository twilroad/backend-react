import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ClearIcon from 'material-ui-icons/Clear';
import ReplyAll from 'material-ui-icons/ReplyAll';
import Cached from 'material-ui-icons/Cached';
import Snackbar from 'material-ui/Snackbar';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import axios from 'axios';

const styles = {
    evenRow: {
        'background': '#f7f7f7',
    },
    menuBtn: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
    },
    btnEdit: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#3f51b5',
        'color': '#fff',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    btnDelete: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#fff',
        'color': '#808080',
        'margin-left': '10px',
        'box-shadow': '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
    },
    root: {
        'padding': '40px 30px',
    },
    table: {
        'border-top': '1px solid rgba(235, 235, 235, 1)',
        'border-collapse': 'inherit',
    },
    tableCell: {
        'text-align': 'left',
        'padding': '0',
        'font-size': '12px',
        'color': 'rgba(0, 0, 0, 0.54)',
    },
};
type State = {
    checkedAll: boolean,
    rowsPerPage: number,
    currentPage: number,
    totalItems: number,
    open: boolean,
    reduction: boolean,
    openMessageTip: boolean,
    pageStatus: boolean,
    message: string,
    modalId: string,
    modalName: string,
    modalType: number,
    reductionType: number,
    modalNum: number,
    searchValue: string,
    list: Array<any>,
    selection: Array<any>,
};

interface Props extends WithStyles<keyof typeof styles> {
    history: History;
    hosts: string;
}

class UserRecycle extends React.Component<Props, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            checkedAll: false,
            rowsPerPage: 0,
            currentPage: 0,
            totalItems: 0,
            open: false,
            reduction: false,
            modalId: '',
            modalName: '',
            modalType: 0,
            reductionType: 0,
            modalNum: 0,
            openMessageTip: false,
            searchValue: '',
            message: '',
            list: [
                {
                    id: 1,
                    check: false,
                    name: 'ewye',
                    userName: 'admin',
                    email: '635489@qq.com',
                    phone: '1672849009',
                },
                {
                    id: 2,
                    check: false,
                    name: 'ewye',
                    userName: 'admin',
                    email: '635489@qq.com',
                    phone: '1672849009',
                },
            ],
            selection: [],
            pageStatus: false,
        };
    }
    // componentDidMount() {}
    refreshPage = () => {
        window.console.log(this.state.list);
    }
    handleChangeAll = (name: any) => (event: any) => {
        if (event.target.checked) {
            for (let i = 0; i < this.state.list.length; i += 1) {
                this.state.list[i].check = true;
            }
        } else {
            for (let i = 0; i < this.state.list.length; i += 1) {
                this.state.list[i].check = false;
            }
        }
        this.setState({
            [name]: event.target.checked,
        });
    };
    handleChange = (pro: any) => (event: any) => {
        this.setState({
            checkedAll: true
        });
        pro.check = event.target.checked;
        for (let i = 0; i < this.state.list.length; i += 1) {
            if (this.state.list[i].check === false) {
                this.setState({
                    checkedAll: false
                });
            }
        }
        this.setState({
            [pro]: event.target.checked,
        });
    };
    handleClickRemove = (pro: any) => {
        this.setState({
            modalName: pro.name,
            modalId: pro.id,
            open: true,
            modalType: 0,
        });
    };
    handleBatchRemove = () => {
        const arr = new Array();
        const ids = new Array();
        const newIds = new Array();
        for (let i = 0; i < this.state.list.length; i += 1) {
            if (this.state.list[i].check) {
                arr.push(this.state.list[i].check);
                ids.push(this.state.list[i].id);
                if (ids.length > 0) {
                    this.setState({
                        open: true,
                        modalType: 1,
                        modalNum: arr.length,
                        selection: ids,
                    });
                }
            } else {
                newIds.push(this.state.list[i].id);
                if (ids.length <= 0 && newIds.length === this.state.list.length) {
                    this.setState({
                        openMessageTip: true,
                        message: '请选择要删除的用户',
                    });
                }
            }
        }
    };
    handleClose = (pro: any) => {
        if (pro === 1) {
            this.setState({ open: false });
        } else if (pro === 2) {
            this.setState({ reduction: false });
        }
    };
    handleSubmit = () => {
        let ids = new Array();
        if (this.state.modalType === 0) {
            ids.push(this.state.modalId);
        } else {
            ids = this.state.selection;
        }
        window.console.log(ids);
    };
    handleSubmitReduc = () => {
        let ids = new Array();
        if (this.state.reductionType === 0) {
            ids.push(this.state.modalId);
        } else {
            ids = this.state.selection;
        }
        window.console.log(ids);
    };
    handleCloseTip = () => {
        this.setState({ openMessageTip: false });
    };
    handlePageClick = (data: any) => {
        this.setState({
            currentPage: data.selected - 1,
        });
    };
    handleClickReduction = (pro: any) => {
        this.setState({
            modalName: pro.name,
            modalId: pro.id,
            reduction: true,
            reductionType: 0,
        });
    }
    handleBatchReduction = () => {
        window.console.log();
    }

    render() {
        const { totalItems, rowsPerPage, list, modalType, openMessageTip, message, reductionType } = this.state;
        return (
            <div className="cms">
                <div className="top-action-module clearfix">
                    <div className="left-title pull-left">
                        <p className="crumbs">
                            用户中心 / 用户管理
                        </p>
                        <h4 className="title">回收站</h4>
                    </div>
                    <div className="btn-group pull-right">
                        <IconButton
                            className={this.props.classes.menuBtn}
                            onClick={this.handleBatchRemove}
                            title="删除"
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            className={this.props.classes.menuBtn}
                            onClick={this.handleBatchReduction}
                            title="还原"
                        >
                            <ReplyAll />
                        </IconButton>
                        <IconButton
                            className={this.props.classes.menuBtn}
                            onClick={this.refreshPage}
                            title="刷新"
                        >
                            <Cached />
                        </IconButton>
                    </div>
                </div>
                <Paper className="root-paper">
                    <div className="table-hidden">
                        <Table className={this.props.classes.table}>
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell className="table-cell-status">
                                        <Checkbox
                                            color="primary"
                                            checked={this.state.checkedAll}
                                            onChange={this.handleChangeAll('checkedAll')}
                                            value="checkedAll"
                                        />
                                    </TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>姓名</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>用户名</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>ID</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>邮箱</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>手机</TableCell>
                                    <TableCell numeric/>
                                </TableRow>
                            </TableHead>
                            <TableBody className="table-body">
                                {list.map((n, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            className={index % 2 === 0 ? this.props.classes.evenRow : ''}
                                            key={n.id}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                className="table-cell-status"
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={n.check}
                                                    onChange={this.handleChange(n)}
                                                    value="n.check"
                                                />
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.name}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.userName}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.id}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.email}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.phone}
                                            </TableCell>
                                            <TableCell className="table-action-btn" numeric>
                                                <IconButton
                                                    className={this.props.classes.btnEdit}
                                                    onClick={() => this.handleClickReduction(n)}
                                                    title="还原"
                                                >
                                                    <ReplyAll />
                                                </IconButton>
                                                <IconButton
                                                    className={this.props.classes.btnDelete}
                                                    onClick={() => this.handleClickRemove(n)}
                                                    title="删除"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <Snackbar
                        className="message-snack-bar"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={openMessageTip}
                        onClose={this.handleCloseTip}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{message}</span>}
                    />
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
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-content-action"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        className="dialog-title"
                    >
                        <IconButton
                            onClick={() => this.handleClose(1)}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <h3>确定要删除此项内容吗？ </h3>
                        {
                            modalType === 0 ? <h4>确定要删除文章"{this.state.modalName}"吗?</h4> :
                                <h4>确定要删除这"{this.state.modalNum}"个文章吗?</h4>}
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={() => this.handleClose(1)}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} autoFocus>
                            删除
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.reduction}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-content-action"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        className="dialog-title"
                    >
                        <IconButton
                            onClick={() => this.handleClose(2)}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <h3>确定要还原此项内容吗？ </h3>
                        {
                            reductionType === 0 ? <h4>确定要还原文章"{this.state.modalName}"吗?</h4> :
                                <h4>确定要还原这"{this.state.modalNum}"个文章吗?</h4>}
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={() => this.handleClose(2)}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmitReduc} autoFocus>
                            确认提交
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        hosts: state.hosts,
    };
}

export default compose(withStyles(styles))(connect(mapStateToProps)(UserRecycle));