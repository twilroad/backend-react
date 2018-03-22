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
import ModeEdit from 'material-ui-icons/ModeEdit';
import Search from 'material-ui-icons/Search';
import Add from 'material-ui-icons/Add';
import Cached from 'material-ui-icons/Cached';
import Snackbar from 'material-ui/Snackbar';
import Input from 'material-ui/Input';
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
import axios from 'axios';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { compose } from 'recompose';

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
    openSearch: boolean,
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

interface Props extends WithStyles<keyof typeof styles> {
    history: History;
    hosts: string;
}

class Page extends React.Component<Props, State> {
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
            openSearch: false,
            searchValue: '',
            message: '',
            list: [],
            selection: [],
            pageStatus: false,
        };
    }
    componentDidMount() {
        axios.post(`${this.props.hosts}graphql?`, {
            query: `
                query {
                    getPagesLimit(getAllPage: {
                        limitNum: 10,
                        pages: 1,
                    }){
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
                        pages{
                            id,
                            title,
                            check,
                            alias,
                            classify,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const data = response.data.data.getPagesLimit;
                this.setState({
                    list: data.pages,
                    totalItems: data.pagination.totalItems,
                    rowsPerPage: data.pagination.pageSize,
                    currentPage: data.pagination.currentPage - 1,
                });
            }
        });
    }
    refreshPage = () => {
        axios.post(`${this.props.hosts}graphql?`, {
            query: `
                query {
                    getPagesLimit(getAllPage: {
                        limitNum: 10,
                        pages: ${this.state.currentPage + 1},
                    }){
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
                        pages{
                            id,
                            title,
                            check,
                            alias,
                            classify,
                        }
                    }
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const data = response.data.data.getPagesLimit;
                this.setState({
                    list: data.pages,
                    totalItems: data.pagination.totalItems,
                    rowsPerPage: data.pagination.pageSize,
                    currentPage: data.pagination.currentPage - 1,
                    pageStatus: false,
                    searchValue: '',
                    openMessageTip: true,
                    message: '刷新数据完成',
                });
            }
        });
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
            modalName: pro.title,
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
                        message: '请选择要删除的页面',
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
        axios.post(`${this.props.hosts}graphql?`, {
            query: `
                mutation {
                    PageCUD(deletePages:{
                        id: [${ids}],
                        pages: ${this.state.currentPage + 1},
                        limitNum: 10,
                    })
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                this.setState({
                    openMessageTip: true,
                    open: false,
                    message: '删除页面成功！',
                });
                window.setTimeout(
                    () => {
                        this.refreshPage();
                    },
                    1000,
                );
            }
        });
    };
    handleCloseTip = () => {
        this.setState({ openMessageTip: false });
    };
    handleOpenSearch = () => {
        this.setState({ openSearch: true });
    };
    handleCloseSearch = () => {
        if (this.state.searchValue.length < 1) {
            this.setState({ openSearch: false });
        }
    };
    handleChangeSearch = (name: any) => (event: any) => {
        this.setState({
            searchValue: event.target.value,
        });
    };
    handleSearch = () => {
        if (this.state.searchValue.length > 0) {
            axios.post(`${this.props.hosts}graphql?`, {
                query: `
                query {
                    getPagesLimit(serachPages: {
                        keywords: "${this.state.searchValue}",
                        limitNum: 10,
                        pages: ${this.state.currentPage + 1},
                    }){
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
                        pages{
                            id,
                            title,
                            check,
                            alias,
                            classify,
                        }
                    }
                }
            `,
            }).then(response => {
                if (!response.data.errors) {
                    const data = response.data.data.getPagesLimit;
                    this.setState({
                        list: data.pages,
                        totalItems: data.pagination.totalItems,
                        rowsPerPage: data.pagination.pageSize,
                        currentPage: data.pagination.currentPage - 1,
                        pageStatus: true,
                    });
                }
            });
        } else {
            this.refreshPage();
        }
    };
    handlePageClick = (data: any) => {
        if (this.state.pageStatus) {
            axios.post(`${this.props.hosts}graphql?`, {
                query: `
                query {
                    getPagesLimit(serachPages: {
                        keywords: "${this.state.searchValue}",
                        limitNum: 10,
                        pages: ${data.selected + 1},
                    }){
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
                        pages{
                            id,
                            title,
                            check,
                            alias,
                            classify,
                        }
                    }
                }
            `,
            }).then(response => {
                if (!response.data.errors) {
                    const sub = response.data.data.getPagesLimit;
                    this.setState({
                        list: sub.pages,
                        totalItems: sub.pagination.totalItems,
                        rowsPerPage: sub.pagination.pageSize,
                        currentPage: sub.pagination.currentPage - 1,
                        pageStatus: true,
                    });
                }
            });
        } else {
            axios.post(`${this.props.hosts}graphql?`, {
                query: `
                query {
                    getPagesLimit(getAllPage: {
                        limitNum: 10,
                        pages: ${data.selected + 1},
                    }){
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
                        pages{
                            id,
                            title,
                            check,
                            alias,
                            classify,
                        }
                    }
                }
            `,
            }).then(response => {
                if (!response.data.errors) {
                    const res = response.data.data.getPagesLimit;
                    this.setState({
                        list: res.pages,
                        totalItems: res.pagination.totalItems,
                        rowsPerPage: res.pagination.pageSize,
                        currentPage: res.pagination.currentPage - 1,
                        checkedAll: false,
                    });
                }
            });
        }
    };

    render() {
        const { totalItems, rowsPerPage, list, modalType, openMessageTip, message } = this.state;
        return (
            <div className="cms">
                <div className="top-action-module clearfix">
                    <div className="left-title pull-left">
                        <p className="crumbs">
                            CMS / 页面管理
                        </p>
                        <h4 className="title">全部页面</h4>
                    </div>
                    <div className="btn-group pull-right">
                        {
                            this.state.openSearch ?
                                <div className="input-search-module">
                                    <Input
                                        placeholder="请输入要搜索的内容"
                                        className="input-search"
                                        value={this.state.searchValue}
                                        onChange={this.handleChangeSearch('searchValue')}
                                        onKeyUp={this.handleSearch}
                                        onBlur={this.handleCloseSearch}
                                    />
                                    <IconButton
                                        onClick={this.handleSearch}
                                    >
                                        <Search />
                                    </IconButton>
                                </div> :
                                <IconButton
                                    className={this.props.classes.menuBtn}
                                    onClick={this.handleOpenSearch}
                                    title="搜索"
                                >
                                    <Search />
                                </IconButton>
                        }
                        <IconButton
                            className={this.props.classes.menuBtn}
                            onClick={this.handleBatchRemove}
                            title="删除"
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Link to={'/cms/page/edit/' + 'add'}>
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
                                    <TableCell className={this.props.classes.tableCell} numeric>页面名称</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>别名</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>分类</TableCell>
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
                                                    {n.title}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.alias}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.classify}
                                                </TableCell>
                                                <TableCell className="table-action-btn" numeric>
                                                    <Link to={'/cms/page/edit/' + n.id}>
                                                        <IconButton
                                                            className={this.props.classes.btnEdit}
                                                            title="编辑"
                                                        >
                                                            <ModeEdit />
                                                        </IconButton>
                                                    </Link>
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
                        {
                            modalType === 0 ? <h4>确定要删除页面"{this.state.modalName}"吗?</h4> :
                                <h4>确定要删除这"{this.state.modalNum}"个页面吗?</h4>}
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleSubmit} autoFocus>
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

export default compose(withStyles(styles))(connect(mapStateToProps)(Page));