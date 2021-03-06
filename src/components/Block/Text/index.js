import {
    Grid,
    IconButton,
    Paper,
    Popover,
    TextField,
    withStyles,
} from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            emojiPickerState: false,
            cursorPos: 0,
            emojiIcon: false,
        };
    }

    triggerPicker = event => {
        event.preventDefault();
        this.setState({
            emojiPickerState: !this.state.emojiPickerState,
            anchorEl: event.currentTarget,
            emoji: false,
        });
    };

    setMessage = emoji => {
        const { id, onChange } = this.props;
        let { message, cursorPos, emojiIcon } = this.state;
        if (!emojiIcon) {
            cursorPos = document.getElementById(`text-block-${id}`)
                .selectionStart;
        } else {
            cursorPos += 2;
        }
        let startMsg = message.substring(0, cursorPos);
        let endMSg = message.substring(cursorPos, message.length);
        this.setState({
            message: startMsg + emoji.native + endMSg,
            cursorPos: cursorPos,
            emojiIcon: true,
        });
        onChange({ id, title: startMsg + emoji.native + endMSg });
    };

    handleChange = event => {
        const { id, onChange } = this.props;
        let { value } = event.target;
        onChange({ id, title: value });
        this.setState({
            message: value,
        });
    };

    componentDidMount() {
        const { text } = this.props;
        if (text !== null && text !== undefined) {
            this.setState({
                message: text,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { text } = nextProps;
        this.setState({
            message: text,
        });
    }

    render() {
        const { classes, fullWidth, id } = this.props;
        const { emojiPickerState, anchorEl } = this.state;
        return (
            <Grid item sm={fullWidth ? 12 : 8}>
                <Paper elevation={3}>
                    <Grid container>
                        <Grid item sm={12} className={classes.message}>
                            <TextField
                                id={`text-block-${id}`}
                                label="Text message"
                                name="text"
                                variant="outlined"
                                onChange={this.handleChange}
                                value={this.state.message}
                                fullWidth
                                multiline
                                className={classes.textContent}
                            />
                            <IconButton
                                onClick={this.triggerPicker}
                                className={classes.emojiIcon}
                            >
                                <MoodIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Popover
                        open={emojiPickerState}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={() =>
                            this.setState({
                                emojiPickerState: false,
                                emojiIcon: false,
                            })
                        }
                    >
                        <Picker
                            title="Pick your emoji…"
                            emoji="point_up"
                            onSelect={emoji => this.setMessage(emoji)}
                        />
                    </Popover>
                </Paper>
            </Grid>
        );
    }
}

Text.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Text);
