import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import { FormLabel, FormControlLabel, FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

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
    time: any,
    name: string,
    reason: string,
    banStatus: string,
    banType: string,
};

class UserManagerBan extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            time: new Date(),
            name: 'wx_晨辰Bka',
            reason: '',
            banStatus: '不封禁',
            banType: '不封禁',
        };
    }
    handleChange = (name: any) => (event: any) => {
        let val = event.target.value;
        this.setState({
            [name]: val,
        });
    };
    handleChangeType = (name: any) => (event: any) => {
        let val = event.target.value;
        this.setState({
            [name]: val,
            banStatus: val,
        });
    };
    handleDateChange = (date: any) => {
        this.setState({ time: date });
    };
    handleSubmit = () => {
        window.console.log(this.state.banStatus);
    };

    render() {
        return (
            <div className="user-form-gird">
                <p className="crumbs">
                    用户中心 <b>/</b> 用户管理
                </p>
                <h4 className="title">封禁</h4>
                <Paper className={this.props.classes.root}>
                    <form className={this.props.classes.container} noValidate autoComplete="off">
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <FormLabel className={this.props.classes.formLabel}>禁止用户名</FormLabel>
                                    {this.state.name}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >

                                    <FormLabel className={this.props.classes.formLabel}>当前状态</FormLabel>
                                    {this.state.banStatus}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6} style={{marginTop: '-24px'}}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <FormLabel className={this.props.classes.formLabel}>禁止类型</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        classes={{
                                            root: this.props.classes.radioRoot,
                                        }}
                                        value={this.state.banType}
                                        onChange={this.handleChangeType('banType')}
                                    >
                                        <FormControlLabel
                                            classes={{
                                                root: this.props.classes.FormControlRoot,
                                                label: this.props.classes.FormControlLabel
                                            }}
                                            value="不封禁"
                                            control={
                                                <Radio
                                                    color="primary"
                                                    classes={{
                                                        default: this.props.classes.radioDefault,
                                                    }}
                                                />
                                            }
                                            label="不封禁"
                                        />
                                        <FormControlLabel
                                            classes={{
                                                root: this.props.classes.FormControlRoot,
                                                label: this.props.classes.FormControlLabel
                                            }}
                                            value="可浏览网站开放内容"
                                            control={<Radio
                                                color="primary"
                                                classes={{
                                                    default: this.props.classes.radioDefault,
                                                }}
                                            />}
                                            label="可浏览网站开放内容"
                                        />
                                        <FormControlLabel
                                            classes={{
                                                root: this.props.classes.FormControlRoot,
                                                label: this.props.classes.FormControlLabel
                                            }}
                                            value="可浏览个人资料"
                                            control={<Radio
                                                color="primary"
                                                classes={{
                                                    default: this.props.classes.radioDefault,
                                                }}
                                            />}
                                            label="可浏览个人资料"
                                        />
                                        <FormControlLabel
                                            classes={{
                                                root: this.props.classes.FormControlRoot,
                                                label: this.props.classes.FormControlLabel
                                            }}
                                            value="禁止登录"
                                            control={<Radio
                                                color="primary"
                                                classes={{
                                                    default: this.props.classes.radioDefault,
                                                }}
                                            />}
                                            label="禁止登录"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ marginTop: '-20px' }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        className="data-picker"
                                        style={{marginBottom: '32px'}}
                                        autoOk
                                        showTabs={false}
                                        autoSubmit={false}
                                        format="YYYY/MM/DD hh:mm A"
                                        mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ',
                                            /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                                        label="封禁时间"
                                        value={this.state.time}
                                        onChange={this.handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        禁止/解禁用户的理由
                                    </InputLabel>
                                    <Input
                                        multiline={true}
                                        rowsMax="3"
                                        rows="3"
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        className={this.props.classes.formLabelFont}
                                        onChange={this.handleChange('reason')}
                                        value={this.state.reason}
                                    />
                                    <FormHelperText classes={{root: this.props.classes.helpText}}>
                                        由于前后端分离机制，官方不对多域名做特殊支持，可能导致其他未知问题
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            variant="raised"
                            color="primary"
                            style={{marginTop: 34, fontSize: 12, borderRadius: 4}}
                            onClick={this.handleSubmit}
                        >
                            确认提交
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
export default withStyles(styles)(UserManagerBan);