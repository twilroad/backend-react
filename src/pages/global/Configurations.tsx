import * as React from 'react';
import Paper from 'material-ui/Paper';
import { FormControlLabel, FormControl, FormHelperText } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { RootState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const styles = {
    root: {
        'padding': '40px 30px',
    },
    container: {
        display: 'flex',
        'flex-wrap': 'wrap',
        'margin': '0',
    },
    labelClass: {
        'color': '#b8b8b8',
    },
    menu: {
        'width': '200px',
    },
    formLabel: {
        'flex-direction': 'row-reverse',
        'margin': '0',
        'font-size': '16px !important',
        'color': '#333',
        'width': '100%',
    },
    formLabelFont: {
        'font-size': '16px',
    },
    subLabel: {
        'font-size': '12px',
        'color': '#808080',
    },
    switchHeight: {
        'height': '20px',
    },
    switchDefault: {
        'height': 'inherit',
    },
    helpText: {
        color: '#808080',
        fontSize: '12px',
        marginTop: 0,
    },
    underline: {
        '&:before': {
            background: '#dfdfdf',
        }
    },
};

type State = {
    webName: string,
    siteOpen: boolean,
    domainName: string,
    multiDomainOpen: boolean,
    keepRecord: string,
    companyName: string,
    copyright: string,
    statisticalCode: string,
    loading: boolean,
    transition: any,
    open: boolean,
    errorMessage: string,
};

interface Props extends WithStyles<keyof typeof styles> {
    hosts: string;
}

class Configurations extends React.Component<Props, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            webName: 'NotAdd',
            domainName: '',
            siteOpen: true,
            multiDomainOpen: false,
            keepRecord: '',
            companyName: '',
            copyright: '',
            statisticalCode: '',
            loading: false,
            transition: undefined,
            open: false,
            errorMessage: '',
        };
    }
    componentDidMount() {
        axios.post(`${this.props.hosts}graphql?`, {
            query: `
                query {
                    webName: getSettingByKey(key: "global.webName") {
                    key,
                    value,
                    },
                    domainName: getSettingByKey(key: "global.domainName") {
                    key,
                    value,
                    },  
                    siteOpen: getSettingByKey(key: "global.siteOpen") {
                    key,
                    value,
                    },  
                    multiDomainOpen: getSettingByKey(key: "global.multiDomainOpen") {
                    key,
                    value,
                    },  
                    keepRecord: getSettingByKey(key: "global.keepRecord") {
                    key,
                    value,
                    },  
                    companyName: getSettingByKey(key: "global.companyName") {
                    key,
                    value,
                    },  
                    copyright: getSettingByKey(key: "global.copyright") {
                    key,
                    value,
                    },  
                    statisticalCode: getSettingByKey(key: "global.statisticalCode") {
                    key,
                    value,
                    },
                }
            `,
        }).then(response => {
            if (!response.data.errors) {
                const results: object = response.data.data;
                Object.keys(results).forEach((a: string) => {
                    if (results[a] !== null) {
                        const d = {};
                        d[a] = results[a].value;
                        if (results[a].key === 'global.siteOpen' || results[a].key === 'global.multiDomainOpen') {
                            Number(results[a].value) === 1 ? d[a] = true : d[a] = false;
                        }
                        this.setState(d);
                    }
                });
            }
        });
    }
    handleChange = (name: any) => (event: any) => {
        let val = event.target.value;
        this.setState({
            [name]: val,
        });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleSubmit = () => {
        if (this.state.webName) {
            this.setState(
                {
                    loading: true,
                },
            );
            axios.post(`${this.props.hosts}graphql?`, {
                query: `
                mutation {
                    webName: setSetting(key: "global.webName", value: "${this.state.webName}") {
                        code,
                        message,
                    },
                    domainName: setSetting(key: "global.domainName", value: "${this.state.domainName}") {
                        code,
                        message,
                    },  
                    siteOpen: setSetting(key: "global.siteOpen", value: "${this.state.siteOpen ? 1 : 0}") {
                        code,
                        message,
                    },  
                    multiDomainOpen: setSetting(key: "global.multiDomainOpen",
                     value: "${this.state.multiDomainOpen ? 1 : 0}")
                     {
                        code,
                        message,
                    },  
                    keepRecord: setSetting(key: "global.keepRecord", value: "${this.state.keepRecord}") {
                        code,
                        message,
                    },  
                    companyName: setSetting(key: "global.companyName", value: "${this.state.companyName}") {
                        code,
                        message,
                    },  
                    copyright: setSetting(key: "global.copyright", value: "${this.state.copyright}") {
                        code,
                        message,
                    },  
                    statisticalCode: setSetting(key: "global.statisticalCode", value: "${this.state.statisticalCode}") {
                        code,
                        message,
                    },
                }
            `,
            }).then(response => {
                if (!response.data.errors) {
                    this.setState(
                        {
                            open: true,
                            loading: false,
                            errorMessage: response.data.data.companyName.message,
                        },
                    );
                } else {
                    this.setState(
                        {
                            open: true,
                            loading: false,
                            errorMessage: response.data.errors[0].message,
                        },
                    );
                }
            });
        } else {
            this.setState(
                {
                    open: true,
                    loading: false,
                    errorMessage: '请输入网站名称!',
                },
            );
        }
    };
    render() {
        return (
            <div className="configurations">
                <p className="crumbs">
                    全局 <b>/</b> 全局设置
                </p>
                <h4 className="title">参数设置</h4>
                <Paper className={this.props.classes.root}>
                    <form className={this.props.classes.container} noValidate autoComplete="off">
                        <Grid container spacing={40}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    required
                                    error={!this.state.webName}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        网站名称
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('webName')}
                                        value={this.state.webName}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        网站域名
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('domainName')}
                                        value={this.state.domainName}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '16px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    label="站点开启"
                                    classes={ {
                                        root: this.props.classes.formLabel,
                                        label: this.props.classes.formLabel
                                    } }
                                    control={
                                        <Switch
                                            color="primary"
                                            classes={{
                                                root: this.props.classes.switchHeight,
                                                default: this.props.classes.switchDefault,
                                            }}
                                            onChange={(event, checked) => this.setState({ siteOpen: checked })}
                                            checked={this.state.siteOpen}
                                        />
                                    }
                                />
                                <FormHelperText classes={{root: this.props.classes.helpText}}>
                                    关闭后网站将不能访问
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    label="开启多域名"
                                    classes={ {
                                        root: this.props.classes.formLabel,
                                        label: this.props.classes.formLabel
                                    } }
                                    control={
                                        <Switch
                                            color="primary"
                                            classes={{
                                                root: this.props.classes.switchHeight,
                                                default: this.props.classes.switchDefault,
                                            }}
                                            onChange={(event, checked) => this.setState({ multiDomainOpen: checked })}
                                            checked={this.state.multiDomainOpen}
                                        />
                                    }
                                />
                                <FormHelperText classes={{root: this.props.classes.helpText}}>
                                    由于前后端分离机制，官方不对多域名做特殊支持，可能导致其他未知问题
                                </FormHelperText>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        备案信息
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('keepRecord')}
                                        value={this.state.keepRecord}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        公司名称
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('companyName')}
                                        value={this.state.companyName}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '10px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        统计代码
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        multiline={true}
                                        rowsMax="3"
                                        rows="3"
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        className={this.props.classes.formLabelFont}
                                        onChange={this.handleChange('statisticalCode')}
                                        value={this.state.statisticalCode}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        版权信息
                                    </InputLabel>
                                    <Input
                                        id="name-simple"
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('copyright')}
                                        value={this.state.copyright}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
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
                    </form>
                    <Snackbar
                        classes={{
                            root: !this.state.webName ? 'error-prompt' : ''
                        }}
                        open={this.state.open}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={this.handleClose}
                        transition={this.state.transition}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.errorMessage}</span>}
                    />
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state: RootState) {
    return {
        hosts: state.hosts,
    };
}

export default compose(withStyles(styles))(connect(mapStateToProps)(Configurations));
