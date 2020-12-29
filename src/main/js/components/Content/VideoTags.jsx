import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import appData from "../../consts/consts";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * Копонент редактирования тегов видеомаркера.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const VideoTags = (props) => {

    const videoMarker = props.videoMarker;
    const setVideoMarker = props.setVideoMarker;
    const isEdit = props.isEdit;

    return (
        <Autocomplete
            disabled={!isEdit}
            multiple
            options={appData.allTags}
            value={videoMarker.curMarker.tags}
            onChange={(event, newValue) => {
                setVideoMarker({...videoMarker, curMarker: {
                    ...videoMarker.curMarker,
                        tags: [...newValue]
                }})
            }}
            disableCloseOnSelect
            getOptionSelected={
                (o, v) => o.title === v.title
            }
            getOptionLabel={(option) => option.title}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params}
                           variant="standard"
                           label="Теги"
                           />
            )}
        />
    );
}

export default VideoTags;