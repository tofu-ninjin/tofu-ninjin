// https://github.com/souporserious/react-media-player/blob/cbd2edb9b163fc7da5f48f897a8ea3f002c05850/example/PlayPause.jsx

import React from 'react'
import { withMediaProps } from 'react-media-player'
import Transition from 'react-motion-ui-pack'

class ScaleX extends React.Component {
  render() {
    return (
      <Transition
        component="g"
        enter={{ scaleX: 1 }}
        leave={{ scaleX: 0 }}
      >
        {this.props.children}
      </Transition>
    )
  }
}

class PlayPause extends React.Component {
  _handlePlayPause = () => {
    this.props.media.playPause()
  }

  render() {
    const { media: { isPlaying }, className } = this.props
    return (
      <svg
        role="button"
        width="36px"
        height="36px"
        viewBox="0 0 36 36"
        className={className}
        onClick={this._handlePlayPause}
      >
        <circle fill="#373D3F" cx="18" cy="18" r="18"/>
          <ScaleX>
            { isPlaying &&
              <g key="pause" style={{ transformOrigin: '0% 50%' }}>
                <rect x="12" y="11" fill="#CDD7DB" width="4" height="14"/>
                <rect x="20" y="11" fill="#CDD7DB" width="4" height="14"/>
              </g>
            }
          </ScaleX>
          <ScaleX>
            { !isPlaying &&
              <polygon
                key="play"
                fill="#CDD7DB"
                points="14,11 26,18 14,25"
                style={{ transformOrigin: '100% 50%' }}
              />
            }
          </ScaleX>
      </svg>
    )
  }
}

export default withMediaProps(PlayPause)
