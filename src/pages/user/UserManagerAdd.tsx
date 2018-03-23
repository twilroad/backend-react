import * as React from 'react';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import Cascader from 'antd/lib/cascader';
import 'antd/lib/cascader/style/css.js';

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
    handleChangeRole = (value: any, select: any) => {
        if (select.length === 0) {
            this.setState({
                role: '',
                roleId: '',
            });
        } else {
            this.setState({
                role: select[select.length - 1].label,
                roleId: value[value.length - 1],
            });
        }
    };
    handleChangeDepartment = (value: any, select: any) => {
        this.setState({
            department: select[select.length - 1].label,
            departmentId: value[value.length - 1],
        });
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
                                        value={this.state.role}
                                    />
                                    <Cascader
                                        changeOnSelect
                                        className="cascader-picker"
                                        options={this.state.roles}
                                        onChange={this.handleChangeRole}
                                        notFoundContent="Not Found"
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
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="raised" color="primary" style={{marginTop: 34, fontSize: 12, borderRadius: 4}}>
                            确认提交
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
export default withStyles(styles)(UserManagerAdd);