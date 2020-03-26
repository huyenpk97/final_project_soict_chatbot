import { Grid, TextField, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaCompactDisc } from 'react-icons/fa';
import styles from './styles';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item sm={8}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <IconContext.Provider
                                value={{
                                    color: '#208ef0',
                                    className: 'audio-class-name',
                                }}
                            >
                                <div>
                                    <FaCompactDisc />
                                </div>
                            </IconContext.Provider>
                        }
                        title="Audio"
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <Typography
                            component="p"
                            className={classes.infoCard}
                            paragraph
                            variant="body2"
                        >
                            Send an audio file in the chat. Supported formats:
                            MP3, WAV, OGG. Maximum file size: ~20MB. If you use
                            Dropbox, please replace "www" at the beginning of
                            the audio file URL with "dl".
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <TextField
                            id="outlined-full-width"
                            label="URL"
                            helperText="Example: https://dl.dropbox.com/s/sample.mp3"
                            fullWidth
                            variant="outlined"
                        />
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

Audio.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Audio);