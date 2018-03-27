import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui-icons/Clear';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import Cascader from 'antd/lib/cascader';
import 'antd/lib/cascader/style/css.js';
import Radio, { RadioGroup } from 'material-ui/Radio';
// import { ListItemText } from 'material-ui/List';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

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
    menuBtn: {
        'width': '30px',
        'height': '30px',
        'border-radius': '50%',
        'background-color': '#000',
        'opacity': 0.3,
        'color': '#fff',
        'cursor': 'pointer',
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
};
type State = {
    birthday: any,
    department: string,
    departmentId: string,
    departments: Array<any>,
    email: string,
    imgUrl: string,
    name: string,
    nickname: string,
    password: string,
    realname: string,
    role: string,
    roles: Array<any>,
    roleId: string,
    sex: string,
    sexs: Array<any>,
    clear1: boolean,
    clear2: boolean,
    roleModal: boolean,
    userRole: string,
    userRoles: Array<any>,
    roleNames: Array<any>,
    keyword: Array<any>,
    roleSearchType: string,
};

class UserManagerAdd extends React.Component<WithStyles<keyof typeof styles>, State> {
    constructor(props: any, state: any) {
        super(props, state);
        this.state = {
            birthday: new Date(),
            department: '',
            departmentId: '',
            departments: [
                {
                    value: 1,
                    label: '产品中心',
                    children: [],
                },
                {
                    expanded: true,
                    value: 2,
                    label: '新闻资讯',
                    children: [
                        {
                            value: 21,
                            label: '媒体报道',
                            children: [],
                        },
                        {
                            value: 22,
                            label: '行业资讯',
                            children: [
                                {
                                    value: 221,
                                    label: '资讯1-1',
                                    children: [],
                                },
                            ],
                        },
                        {
                            value: 23,
                            label: '企业公告',
                            children: [],
                        },
                    ],
                },
            ],
            email: '',
            imgUrl: '',
            name: '',
            nickname: '',
            password: '',
            realname: '',
            role: '',
            roleId: '',
            roles: [
                {
                    value: 1,
                    label: '商城',
                    children: [
                        {
                            value: 21,
                            label: '总管理员',
                            children: [],
                        },
                    ],
                },
                {
                    expanded: true,
                    value: 2,
                    label: '本初网络',
                    children: [
                        {
                            value: 21,
                            label: '软件事业部',
                            children: [],
                        },
                    ],
                },
            ],
            roleNames: [
                '商城-总管理员',
                '本初网络-软件事业部',
            ],
            sex: '0',
            sexs: [
                {
                    id: '0',
                    sex: '男',
                },
                {
                    id: '1',
                    sex: '女',
                },
            ],
            clear1: false,
            clear2: false,
            roleModal: false,
            userRoles: [],
            keyword: [],
            userRole: '',
            roleSearchType: '按模块查找',
        };
    }
    handleChange = (name: any) => (event: any) => {
        let val = event.target.value;
        this.setState({
            [name]: val,
        });
    };
    handleDateChange = (date: any) => {
        this.setState({ birthday: date });
    };
    getImgURL = (event: any) => {
        const file = event.target.files[0];
        this.setState({ imgUrl: file });
    };
    handleChangeRole = () => {
        this.setState({
            roleModal: false,
        });
    };
    handleRoleModule = (value: any, select: any) => {
        this.state.userRoles.push({
            name: select[select.length - 1].label,
        });
        this.setState({
            role: select[select.length - 1].label,
            roleId: value[value.length - 1],
            // userRoles: arr,
        });
    };
    handleDeleteRole = (index: number) => {
        const arr = Object.assign([], this.state.userRoles);
        let str = this.state.role;
        arr.splice(index, 1);
        if (arr.length === 0) {
            str = '';
        }
        this.setState({
            userRoles: arr,
            role: str,
        });
    };
    handleOpenRole = () => {
        this.setState({
            roleModal: true,
        });
    };
    handleClose = () => {
        this.setState({ roleModal: false });
    };
    handleChangeDepartment = (value: any, select: any) => {
        if (select.length === 0) {
            this.setState({
                department: '',
                departmentId: '',
            });
        } else {
            this.setState({
                department: select[select.length - 1].label,
                departmentId: value[value.length - 1],
                clear2: true,
            });
        }
    };
    clearCasca = (pro: any) => {
        if (pro === 1) {
            this.setState({
                role: '',
                roleId: '',
                clear1: false,
            });
        } else if (pro === 2) {
            this.setState({
                department: '',
                departmentId: '',
                clear2: false,
            });
        }
    };
    handleSubmit = () => {
        window.console.log(this.state.role);
    };

    render() {
        return (
            <div className="user-form-gird">
                <p className="crumbs">
                    用户中心 <b>/</b> 用户管理
                </p>
                <h4 className="title">新增</h4>
                <Paper className={this.props.classes.root}>
                    <form className={this.props.classes.container} noValidate autoComplete="off">
                        <p style={{fontSize: '18px', marginBottom: '14px'}}>基本资料</p>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        required
                                        className={this.props.classes.formLabelFont}
                                    >
                                        用户名
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('name')}
                                        value={this.state.name}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        密码
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        type="password"
                                        onChange={this.handleChange('password')}
                                        value={this.state.password}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <span style={{fontSize: '16px', color: 'rgba(0, 0, 0, 0.54)'}}>头像</span>
                                    <div className="upload-img">
                                        {
                                            this.state.imgUrl &&
                                            <img src={this.state.imgUrl} alt=""/>
                                        }
                                        <IconButton
                                            className={this.props.classes.menuBtn}
                                            style={{ position: 'absolute', top: '6px', right: '6px' }}
                                        >
                                            <PhotoCamera />
                                        </IconButton>
                                        <Input
                                            type="file"
                                            className="upload-image"
                                            onChange={this.getImgURL}
                                            classes={{
                                                underline: this.props.classes.underline,
                                            }}
                                        />
                                    </div>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        邮箱
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('email')}
                                        value={this.state.email}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <p style={{fontSize: '18px', marginBottom: '16px'}}>详细资料</p>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        用户昵称
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('nickname')}
                                        value={this.state.nickname}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        真实姓名
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        onChange={this.handleChange('realname')}
                                        value={this.state.realname}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        性别
                                    </InputLabel>
                                    <Select
                                        className="form-select-underline"
                                        value={this.state.sex}
                                        onChange={this.handleChange('sex')}
                                        input={<Input name="type"/>}
                                    >
                                        {
                                            this.state.sexs.map((item: any, index: number) => {
                                                return (
                                                    <MenuItem
                                                        className="input-drop-paper"
                                                        value={item.id}
                                                        key={index}
                                                    >
                                                        {item.sex}
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
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
                                        label="生日"
                                        value={this.state.birthday}
                                        onChange={this.handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={40} style={{marginTop: '0px'}}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    onClick={this.handleOpenRole}
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        className={this.props.classes.formLabelFont}
                                    >
                                        所属角色
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        value={this.state.userRole}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    className={this.props.classes.formControlMargin}
                                >
                                    <InputLabel
                                        htmlFor="name-simple"
                                        className={this.props.classes.formLabelFont}
                                    >
                                        所属部门
                                    </InputLabel>
                                    <Input
                                        className={this.props.classes.formLabelFont}
                                        classes={{
                                            underline: this.props.classes.underline,
                                        }}
                                        value={this.state.department}
                                    />
                                    <Cascader
                                        changeOnSelect
                                        className="cascader-picker"
                                        options={this.state.departments}
                                        onChange={this.handleChangeDepartment}
                                        notFoundContent="Not Found"
                                    />
                                    {
                                        this.state.clear2 &&
                                        <span
                                            className="ant-cascader-picker-clear"
                                            onClick={() => this.clearCasca(2)}
                                        >
                                            <Clear style={{ width: '16px' }}/>
                                        </span>
                                    }
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
                <Dialog
                    open={this.state.roleModal}
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
                            <Clear />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        <form noValidate autoComplete="off" className="dialog-user-manager">
                            <p style={{marginBottom: '27px'}}>所属角色</p>
                            <FormControl
                                fullWidth
                                className={this.props.classes.formControlMargin}
                            >
                                <InputLabel
                                    className={this.props.classes.formLabelFont}
                                >
                                    用户角色
                                </InputLabel>
                                <Input
                                    className="role-title"
                                    style={{fontSize: '16px'}}
                                    classes={{
                                        underline: this.props.classes.underline,
                                    }}
                                    value={this.state.role}
                                />
                                <div className="select-user-roles">
                                    {
                                        this.state.userRoles.map((item: any, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <span>{item.name}</span>
                                                    <IconButton
                                                        onClick={() => this.handleDeleteRole(index)}
                                                    >
                                                        <Clear />
                                                    </IconButton>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </FormControl>
                            <p>查找角色</p>
                            <FormControl
                                fullWidth
                                className={this.props.classes.formControlMargin}
                                style={{marginBottom: '20px'}}
                            >
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender1"
                                    classes={{
                                        root: this.props.classes.radioRoot,
                                    }}
                                    value={this.state.roleSearchType}
                                    onChange={this.handleChange('roleSearchType')}
                                >
                                    <FormControlLabel
                                        style={{width: '33%'}}
                                        classes={{
                                            root: this.props.classes.FormControlRoot,
                                            label: this.props.classes.FormControlLabel
                                        }}
                                        value="按模块查找"
                                        control={
                                            <Radio
                                                color="primary"
                                                classes={{
                                                    default: this.props.classes.radioDefault,
                                                }}
                                            />
                                        }
                                        label="按模块查找"
                                    />
                                    <FormControlLabel
                                        style={{width: '33%'}}
                                        classes={{
                                            root: this.props.classes.FormControlRoot,
                                            label: this.props.classes.FormControlLabel
                                        }}
                                        value="关键字搜索"
                                        control={<Radio
                                            color="primary"
                                            classes={{
                                                default: this.props.classes.radioDefault,
                                            }}
                                        />}
                                        label="关键字搜索"
                                    />
                                </RadioGroup>
                            </FormControl>
                            {this.state.roleSearchType === '按模块查找' &&
                            <FormControl
                                fullWidth
                                onClick={this.handleOpenRole}
                                className={this.props.classes.formControlMargin}
                            >
                                <InputLabel
                                    className={this.props.classes.formLabelFont}
                                >
                                    请选择模块
                                </InputLabel>
                                <Input
                                    className={this.props.classes.formLabelFont}
                                    classes={{
                                        underline: this.props.classes.underline,
                                    }}
                                    value={this.state.role}
                                />
                                <Cascader
                                    className="cascader-picker"
                                    options={this.state.roles}
                                    onChange={this.handleRoleModule}
                                    notFoundContent="Not Found"
                                />
                            </FormControl>}
                            {/*{this.state.roleSearchType === '关键字搜索' &&
                            <FormControl
                                fullWidth
                                onClick={this.handleOpenRole}
                                className={this.props.classes.formControlMargin}
                            >
                                <InputLabel
                                    className={this.props.classes.formLabelFont}
                                >
                                    请输入关键字
                                </InputLabel>
                                <Select
                                    value={this.state.keyword}
                                    onChange={this.handleChange('keyword')}
                                    input={<Input id="select-multiple" />}
                                >
                                    {this.state.roleNames.map((name: any) => (
                                        <MenuItem key={name} value={name}>
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>}*/}
                        </form>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button onClick={this.handleClose}>
                            取消
                        </Button>
                        <Button onClick={this.handleChangeRole} autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(UserManagerAdd);