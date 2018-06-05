import React from 'react'
import {
  Media,
  Player,
  controls
} from 'react-media-player'
import MuteUnmute from './mute-unmute'
import PlayPause from './play-pause'
import styles from './audio-player.module.scss'

const {
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume
} = controls

class AudioPlayer extends React.Component {
  render() {
    return (
      <Media>
        <div>
          <Player src={this.props.src} />
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <PlayPause className={styles.control} />
              <CurrentTime className={`${styles.control} ${styles.currentTime}`} />
              <span>/</span>
              <Duration className={styles.control} />
            </div>
            <div className={`${styles.controlGroup} ${styles.controlGroupSeek}`}>
              <Progress className={`${styles.control} ${styles.progress}`} />
              <SeekBar className={`${styles.control} ${styles.seekbar}`} />
            </div>
            <div className={`${styles.controlGroupVolume} ${styles.controlGroup}`}>
              <MuteUnmute className={styles.control} />
              <Volume className={`${styles.control} ${styles.volume}`} />
            </div>
          </div>
        </div>
      </Media>
    )
  }
}

export default AudioPlayer
