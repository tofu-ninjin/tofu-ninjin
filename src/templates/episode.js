import React from 'react'
import AudioPlayer from '../components/audio-player'

export default class EpisodeTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <AudioPlayer src={post.frontmatter.audio.url}></AudioPlayer>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export const query = graphql`
  query EpidodeQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        audio {
          url
        }
      }
    }
  }
`
