import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';

const styles = {
    root: {
        'padding': '40px 30px',
    },
    container: {
        'padding': '32px 30px 40px',
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
    mall: Array<any>,
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
            mall: [
                {
                    id: 1,
                    name: '商品管理',
                    selected: false,
                    children: [
                        {
                            id: 11,
                            name: '商品添加',
                            selected: false,
                        },
                        {
                            id: 12,
                            name: '商品编辑',
                            selected: false,
                        },
                        {
                            id: 13,
                            name: '添加分类',
                            selected: false,
                        },
                    ],
                },
                {
                    id: 2,
                    name: '库存管理',
                    selected: false,
                    children: [
                        {
                            id: 21,
                            name: '库存添加',
                            selected: false,
                        },
                        {
                            id: 22,
                            name: '库存编辑',
                            selected: false,
                        },
                        {
                            id: 23,
                            name: '添加分类',
                            selected: false,
                        },
                    ],
                },
            ],
        };
    }
    handleChangeAll = (pro: any) => (event: any, checked: any) => {
        pro.selected = checked;
        if (pro.selected) {
            for (let i = 0; i < pro.children.length; i += 1) {
                pro.children[i].selected = true;
            }
        } else {
            for (let i = 0; i < pro.children.length; i += 1) {
                pro.children[i].selected = false;
            }
        }
        this.setState({
            [pro]: checked,
        });
    };
    handleChange = (type: any, item: any) => (event: any, checked: any) => {
        type.selected = true;
        item.selected = checked;
        for (let i = 0; i < type.children.length; i += 1) {
            if (type.children[i].selected === false) {
                type.selected = false;
            }
        }
        this.setState({
            [item]: checked,
            [type]: type.selected,
        });
    };
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
            <div>
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
                            <Button
                                style={{
                                    backgroundColor: '#ededed',
                                    color: '#808080',
                                    fontSize: '12px',
                                    minHeight: '24px',
                                    display: 'block',
                                    padding: '0',
                                }}
                            >
                                恢复默认
                            </Button>
                            {
                                this.state.mall.map((type: any) => {
                                    return (
                                        <FormControl
                                            key={type.id}
                                            className="user-manager-authority"
                                            style={{display: 'block', marginTop: 20}}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={type.selected}
                                                        onChange={this.handleChangeAll(type)}
                                                        value="type.selected"
                                                        color="primary"
                                                    />
                                                }
                                                label={type.name}
                                            />
                                            <FormGroup row>
                                                {
                                                    type.children.map((item: any) => {
                                                        return (
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={item.selected}
                                                                        onChange={this.handleChange(type, item)}
                                                                        value="item.selected"
                                                                        color="primary"
                                                                    />
                                                                }
                                                                label={item.name}
                                                                key={item.id}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </FormControl>
                                    );
                                })
                            }
                            <Button
                                variant="raised"
                                color="primary"
                                style={{
                                    marginTop: 34,
                                    fontSize: 12,
                                    display: 'block',
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
                        </form>
                    }
                    {
                        this.state.tab === 1 &&
                        <div className={this.props.classes.container}>1</div>
                    }
                    {
                        this.state.tab === 2 &&
                        <div className={this.props.classes.container}>2</div>
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