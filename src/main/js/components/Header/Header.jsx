import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import {Link, NavLink} from "react-router-dom";

/**
 * Пользовательские классы.
 *
 * @type {(props?: any) => ClassNameMap<"typographyStyles">}
 */
const useStyles = makeStyles((theme) => ({
    typographyStyles: {
        flex: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    activeLink: {
        color: "gold",
    }
}));

/**
 * Отображение компонента заголовок.
 *
 * @returns {JSX.Element} JSX элемент заголовка.
 * @constructor
 */
const Header = () => {
    const s = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={s.menuButton}
                    color="inherit"
                    aria-label="menu"
                    aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/" onClick={handleClose}>
                        Видео Сервис
                    </MenuItem>
                    <MenuItem component={Link} to="/instagram" onClick={handleClose}>
                        Инстаграмм СММ
                    </MenuItem>
                </Menu>
                <Typography className={s.typographyStyles}>
                    Мои проекты.
                </Typography>
                <PersonIcon/>
            </Toolbar>
        </AppBar>
    )
};

export default Header;