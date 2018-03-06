import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import ReactPaginate from 'react-paginate';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ClearIcon from 'material-ui-icons/Clear';
import Switch from 'material-ui/Switch';
import axios from 'axios';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

const styles = {
    evenRow: {
        'background': '#f7f7f7',
    },
    menuBtn: {
        'width': '32px',
        'height': '32px',
        'border-radius': '50%',
        'background-color': '#ffffff',
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
        'text-align': 'center',
        'padding': '0',
    },
};
type State = {
    open: boolean,
    modalIdentification: string,
    modalName: string,
    rowsPerPage: number,
    currentPage: number,
    list: any,
    transition: any,
    snackOPen: boolean,
    errorMessage: string,
    loading: boolean,
};

class ModuleOpen extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            list: [],
            open: false,
            modalIdentification: '',
            modalName: '',
            rowsPerPage: 3,
            currentPage: 0,
            transition: undefined,
            snackOPen: false,
            errorMessage: '',
            loading: false,
        };
    }
    handleChange = (pro: any) => (event: any, checked: any) => {
        const self = this;
        let api = 'enableModule';
        if (!checked) {
            api = 'disableModule';
        }
        axios.post('http://localhost:3000/graphql?', {
            query: `
                mutation {
                    api: ${api}(identification: "${pro.identification}") {
                    code,
                    message
                    },
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                pro.enabled = checked;
                self.setState(
                    {
                        snackOPen: true,
                        errorMessage: response.data.data.api.message,
                        [pro]: checked,
                    },
                );
            } else {
                self.setState(
                    {
                        snackOPen: true,
                        errorMessage: response.data.errors[0].message,
                    },
                );
            }
        });

    };
    componentDidMount() {
        const self = this;
        axios.post('http://localhost:3000/graphql?', {
            query: `
                query {
                    getModules(filters: {installed: true}) {
                    authors {
                        username,
                        email
                    },
                    description,
                    enabled,
                    identification,
                    installed,
                    location,
                    name,
                    version
                    },
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const results: object = response.data.data.getModules;
                self.setState({
                    list: results
                });
            }
        });
    }
    handleClickOpen = (pro: any) => {
        this.setState({
            modalName: pro.name,
            modalIdentification: pro.identification,
            open: true,
        });
    };
    handleWithAuthors = (authors: any) => {
        const data: Array<{email?: string, username?: string}> = [];
        let result: Array<string> = [];
        if (typeof authors === 'object') {
            Object.keys(authors).map((value: string) => {
                if (typeof authors[value] === 'object') {
                    data.push(authors[value]);
                }
            });
        }
        data.forEach(value => {
            let info: string = '';
            if (value.username) {
                info += value.username;
                if (value.email) {
                    info += `<${value.email}>`;
                }
            }
            if (info.length) {
                result.push(info);
            }
        });
        return result.join(',');
    };
    handleSure = () => {
        this.handleDelete(this.state.modalIdentification);
    };
    handleDelete = (name: any) => {
        this.setState(
            {
                loading: true,
            },
        );
        axios.post('http://localhost:3000/graphql?', {
            query: `
                mutation {
                    uninstallModule(identification: "${name}") {
                    code,
                    message
                    },
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                this.setState(
                    {
                        snackOPen: true,
                        loading: false,
                        errorMessage: response.data.data.uninstallModule.message,
                    },
                );
                this.handleClose();
                this.componentDidMount();
            } else {
                this.setState(
                    {
                        snackOPen: true,
                        loading: false,
                        errorMessage: response.data.errors[0].message,
                    },
                );
            }
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handlePageClick = (data: any) => {
        this.setState({ currentPage: data.selected });
    };
    render() {
        const { currentPage, rowsPerPage, list } = this.state;
        return (
            <div>
                <p className="crumbs">
                    全局 / 应用管理 / 模块配置
                </p>
                <h4 className="title">开启模块</h4>
                <Paper className="root-paper">
                    <div className="table-hidden">
                        <Table className={this.props.classes.table}>
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell className={this.props.classes.tableCell} numeric>模块名称</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>作者</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>描述</TableCell>
                                    <TableCell className={this.props.classes.tableCell} numeric>状态</TableCell>
                                    <TableCell numeric/>
                                </TableRow>
                            </TableHead>
                            <TableBody className="table-body">
                                {list.slice(currentPage * rowsPerPage, rowsPerPage * currentPage + rowsPerPage)
                                    .map((n: any, index: number) => {
                                        return (
                                            <TableRow
                                                hover
                                                className={index % 2 === 0 ? this.props.classes.evenRow : ''}
                                                key={index}
                                            >
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.name}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {this.handleWithAuthors(n.authors)}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    {n.descri}
                                                </TableCell>
                                                <TableCell className={this.props.classes.tableCell} numeric>
                                                    <Switch
                                                        color="primary"
                                                        checked={n.enabled}
                                                        onChange={this.handleChange(n)}
                                                        aria-label="n.enabled"
                                                    />
                                                </TableCell>
                                                <TableCell numeric>
                                                    <IconButton
                                                        className={this.props.classes.menuBtn}
                                                        onClick={() => this.handleClickOpen(n)}
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
                    <div className="table-pagination">
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={<a href="javascript: void (0);">...</a>}
                            breakClassName={'break-me'}
                            pageCount={list.length / rowsPerPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
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
                        <h4>确定要删除模块名称"{this.state.modalName}"吗?</h4>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleSure} autoFocus>
                            确认提交
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={this.state.snackOPen}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={this.handleClose}
                    transition={this.state.transition}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.errorMessage}</span>}
                />
            </div>
        );
    }
}
export default withStyles(styles)(ModuleOpen);