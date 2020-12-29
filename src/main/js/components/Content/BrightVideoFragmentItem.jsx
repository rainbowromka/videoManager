import React, {useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from '@material-ui/core/CardMedia';
import {Grid} from "@material-ui/core";
import VideoTags from "./VideoTags";
import {red, green} from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
/**
 * Компонент отображения елемта списка видеофрагментов.
 */

/**
 * Стили отображения.
 */
const useStyles = makeStyles((theme) => ({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    typographyStyles: {
        flex: 1
    },
    isConnected: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    isDisconnected: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
}));

/**
 * Компонент отображения елемта списка видеофрагментов.
 *
 * @param props пропсы содержат элемент видеофрагмента - маркер.
 * @returns {JSX.Element}
 * @constructor
 */
const BrightVideoFragmentItem = (props) => {
    const classes = useStyles();

    /**
     * Хук работы с состоянием компонента. Содержит текущий и старый маркеры.
     * Хук может находиться в режиме редактирования. Если пользователь отменил
     * редактирование элемента. То текущий маркер будет изменен на старый.
     */
    const [videoMarker, setVideoMarker] = React.useState({
        curMarker: props.videoMarkerObj,
        oldMarker: {...props.videoMarkerObj}
    });

    /**
     * Хук работы с состоянием компонента. Хранит информацию, в каком режиме
     * находится компонент true - режим редактирования, false - режим просмотра.
     */
    const [isEdit, setIsEdit] = React.useState(false);

    /**
     * Обработчик события в случае изменения состояния компонента, признака
     * редактирования. Если режим редактирования включен, то компонент
     * сохраняется и компонент переводится в режим просмотра. Если компонент не
     * в режиме редактирования, то делается копия маркера в старую копию, и
     * компонент переводится в режим редактирования.
     */
    const onEdit = () => {
        if (isEdit) {
            setVideoMarker({...videoMarker});
            props.saveMarker(videoMarker.curMarker);
        } else {
            setVideoMarker({...videoMarker, oldMarker: {...videoMarker.curMarker}});
        }
        setIsEdit(!isEdit)
    }

    /**
     * Это событие возникает в случае отмены редактирования маркера. Компонент
     * переводится в режим просмотра. А текущий маркер откатывается до
     * первоначального состояния.
     */
    const onCancel = () => {
        setVideoMarker({...videoMarker, curMarker: {...videoMarker.oldMarker}});
        setIsEdit(false);
    }

    /**
     * Визуализация компонента.
     */
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={
                        videoMarker.curMarker.discIsConnected
                            ? classes.isConnected
                            : classes.isDisconnected
                    }>
                        {videoMarker.curMarker.disc}
                    </Avatar>
                }
                action={
                    <>
                        <IconButton aria-label="settings" onClick={onEdit}>
                            {isEdit
                                ? <SaveAltIcon />
                                : <EditIcon />}
                        </IconButton>
                        {isEdit &&
                        <IconButton aria-label="settings" onClick={onCancel}>
                            <CancelIcon />
                        </IconButton>
                        }
                        <IconButton aria-label="settings">
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
                title={videoMarker.curMarker.title}
                subheader={videoMarker.curMarker.dateCreation}
            />
            <CardContent>
                <Grid container
                      spacing={1}>
                    {/*|xs      sm       md*/}
                    <Grid xs={12} sm={6} md={8} item container direction="column">
                        <Typography className={classes.typographyStyles} variant="body2" component="p">
                            {videoMarker.curMarker.description}
                        </Typography>
                        <VideoTags
                            videoMarker={videoMarker}
                            setVideoMarker={setVideoMarker}
                            isEdit={isEdit}/>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} item>
                        <CardMedia
                            style={{maxHeight: "264px"}}
                            component="img"
                            image={videoMarker.curMarker.preView}
                            title="Перед пролазом."/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Посмотреть</Button>
                <Button size="small" onClick={onEdit}>
                    {isEdit ? "Сохранить" :"Редактировать"}
                </Button>
                {isEdit && <Button size="small" onClick={onCancel}>Отменить</Button>}
            </CardActions>
        </Card>
    )
}

export default BrightVideoFragmentItem;

