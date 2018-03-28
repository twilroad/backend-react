import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
    root: {
        'padding': '40px 30px',
    },
    container: {
        'display': 'flex',
        'flex-wrap': 'wrap',
        'margin': '0',
    },
    formLabelFont: {
        'font-size': '16px',
    },
    formControlMargin: {
        'margin-bottom': '34px',
        'margin-top': '-20px',
    },
    underline: {
        '&:before': {
            background: '#dfdfdf',
        }
    },
    formLabel: {
        'color': '#808080',
        'flex-direction': 'row-reverse',
        'font-size': '12px !important',
        'margin': '0',
        'width': '100%',
    },
    FormControlLabel: {
        'font-size': '12px',
    },
    FormControlRoot: {
        'margin-left': '0',
        'margin-right': '0',
        width: '50%',
    },
    radioDefault: {
        'margin-right': '5px',
        'width': 'auto',
        height: '32px',
    },
    radioRoot: {
        'flex-direction': 'row',
    },
    helpText: {
        color: '#b3b3b3',
        fontSize: '12px',
    },
};
type State = {
    tab: number,
    loading: boolean,
    open: boolean,
    transition: any,
    errorMessage: string,
    error: boolean,
};

class UserManagerAuthority extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            tab: 0,
            loading: false,
            transition: undefined,
            open: false,
            errorMessage: '',
            error: false,
        };
    }
    handleChangeTab = (event: any, value: number) => {
        this.setState({ tab: value });
    };
    handleCloseTip = () => {
        this.setState({ open: false });
    };
    handleSubmit = () => {
        window.console.log(this.state.tab);
    };

    render() {
        return (
            <div className="user-form-gird">
                <p className="crumbs">
                    用户中心 <b>/</b> 用户管理 <b>/</b> 用户管理
                </p>
                <h4 className="title">权限</h4>
                <Paper>
                    <Tabs
                        className="paper-tabs"
                        value={this.state.tab}
                        onChange={this.handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab
                            label="商城"
                            className="paper-tab"
                        />
                        <Tab
                            label="论坛"
                            className="paper-tab"
                        />
                        <Tab
                            label="CMS"
                            className="paper-tab"
                        />
                    </Tabs>
                    {
                        this.state.tab === 0 &&
                        <form className={this.props.classes.container} noValidate autoComplete="off">
                            <Grid container spacing={40}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    style={{
                                        marginTop: 34,
                                        fontSize: 12,
                                        borderRadius: 4
                                    }}
                                    disabled={
                                        this.state.loading
                                    }
                                    className={
                                        this.state.loading ?
                                            'disabled-btn' : ''
                                    }
                                    onClick={this.handleSubmit}
                                >
                                    {this.state.loading ?  <div><CircularProgress size={24}/></div> : '确认提交'}
                                </Button>
                            </Grid>
                        </form>
                    }
                    {
                        this.state.tab === 1 &&
                        <div className={this.props.classes.container}>1</div>
                    }
                    {
                        this.state.tab === 2 &&
                        <div className={this.props.classes.container}>1</div>
                    }
                </Paper>
                <Snackbar
                    classes={{
                        root: (this.state.error ? 'error-snack-bar' : 'message-snack-bar'),
                    }}
                    open={this.state.open}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={this.handleCloseTip}
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
export default withStyles(styles)(UserManagerAuthority);