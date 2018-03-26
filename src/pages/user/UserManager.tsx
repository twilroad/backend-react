import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ClearIcon from 'material-ui-icons/Clear';
import Add from 'material-ui-icons/Add';
import Cached from 'material-ui-icons/Cached';
import Done from 'material-ui-icons/Done';
import Clear from 'material-ui-icons/Clear';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import Snackbar from 'material-ui/Snackbar';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Collapse from 'material-ui/transitions/Collapse';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { Manager, Target, Popper } from 'react-popper';
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
    openMessageTip: boolean,
    pageStatus: boolean,
    message: string,
    modalId: string,
    modalName: string,
    modalType: number,
    modalNum: number,
    searchValue: string,
    list: Array<any>,
    selection: Array<any>,
};

class UserManager extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            checkedAll: false,
            rowsPerPage: 0,
            currentPage: 0,
            totalItems: 0,
            open: false,
            modalId: '',
            modalName: '',
            modalType: 0,
            modalNum: 0,
            openMessageTip: false,
            searchValue: '',
            message: '',
            list: [
                {
                    id: 1,
                    check: false,
                    toggle: false,
                    name: 'ewye',
                    userName: 'admin',
                    status: true,
                    email: '635489@qq.com',
                    phone: '1672849009',
                    role: '',
                    department: '',
                },
                {
                    id: 2,
                    check: false,
                    toggle: false,
                    name: 'ewye',
                    userName: 'admin',
                    status: false,
                    email: '635489@qq.com',
                    phone: '1672849009',
                    role: '',
                    department: '',
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
    handleClose = () => {
        this.setState({ open: false });
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
    handleCloseTip = () => {
        this.setState({ openMessageTip: false });
    };
    handlePageClick = (data: any) => {
        this.setState({
            currentPage: data.selected - 1,
        });
    };
    handleToggle = (pro: any) => {
        this.state.list.forEach((item, index) => {
            if (pro === index) {
                this.state.list[index].toggle = !this.state.list[index].toggle;
            } else {
                this.state.list[index].toggle = false;
            }
        });
        this.setState({ list: this.state.list });
    };
    handleCloseToggle = (event: any) => {
        this.setState({ open: false });
    };
    render() {
        const { totalItems, rowsPerPage, list, modalType, openMessageTip, message } = this.state;
        return (
            <div className="cms">
                <div className="top-action-module clearfix">
                    <div className="left-title pull-left">
                        <p className="crumbs">
                            用户中心 / 用户管理
                        </p>
                        <h4 className="title">用户管理</h4>
                    </div>
                    <div className="btn-group pull-right">
                        <IconButton
                            className={this.props.classes.menuBtn}
                            onClick={this.handleBatchRemove}
                            title="删除"
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Link to={'/user/manager/add'}>
                            <IconButton
                                className={this.props.classes.menuBtn}
                                title="新增"
                            >
                                <Add />
                            </IconButton>
                        </Link>
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
                                    <TableCell className={this.props.classes.tableCell} numeric>状态</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>邮箱</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>手机</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>角色</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>部门</TableCell>
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
                                                {n.status ? <Done
                                                    style={{
                                                        width: '23px',
                                                        height: '12px',
                                                        color: '#4caf50'
                                                    }}
                                                /> : <Clear
                                                    style={{
                                                        width: '23px',
                                                        height: '12px',
                                                        color: '#f44336'
                                                    }}
                                                />}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.email}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.phone}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.role}
                                            </TableCell>
                                            <TableCell className={this.props.classes.tableCell} numeric>
                                                {n.department}
                                            </TableCell>
                                            <TableCell className="table-action-btn" numeric>
                                                <Manager style={{ display: 'inline-block' }}>
                                                    <Target>
                                                        <IconButton
                                                            className={this.props.classes.btnDelete}
                                                            aria-haspopup="true"
                                                            onClick={() => this.handleToggle(index)}
                                                        >
                                                            <KeyboardArrowDown />
                                                        </IconButton>
                                                    </Target>
                                                    <Popper
                                                        placement="bottom-start"
                                                        eventsEnabled={n.toggle}
                                                        className="popper-bottom-start"
                                                    >
                                                        <ClickAwayListener onClickAway={this.handleCloseToggle}>
                                                            <Collapse
                                                                in={n.toggle}
                                                                style={{ transformOrigin: '0 0 0' }}
                                                            >
                                                                <Paper style={{ margin: 3 }}>
                                                                    <MenuList role="menu" className="table-action-menu">
                                                                        <MenuItem>
                                                                            <Link to={'/user/manager/ban'}>
                                                                                封禁
                                                                            </Link>
                                                                        </MenuItem>
                                                                        <MenuItem onClick={this.handleCloseToggle}>
                                                                            编辑
                                                                        </MenuItem>
                                                                        <MenuItem onClick={this.handleCloseToggle}>
                                                                            权限
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </Paper>
                                                            </Collapse>
                                                        </ClickAwayListener>
                                                    </Popper>
                                                </Manager>
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
                            onClick={this.handleClose}
                        >
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <h3>确定要删除此项内容吗？ </h3>
                        {
                            modalType === 0 ? <h4>确定要删除用户"{this.state.modalName}"吗?</h4> :
                                <h4>确定要删除这"{this.state.modalNum}"个用户吗?</h4>}
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} autoFocus>
                            删除
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(UserManager);