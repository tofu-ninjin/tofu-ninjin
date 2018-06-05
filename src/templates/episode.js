import React from 'react'
import { Card, Header } from 'semantic-ui-react'
import AudioPlayer from '../components/audio-player'
import { generateSubtitle } from '../helpers/episode'

export default class EpisodeTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const subtitle = generateSubtitle(post.frontmatter.topics, post.frontmatter.speakers)

    return (
      <Card fluid>
        <Card.Content>
          <h1>{post.frontmatter.title}</h1>
          <p>{subtitle}</p>
          <AudioPlayer src={post.frontmatter.audio.url}></AudioPlayer>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Card.Content>
      </Card>
    )
  }
}

export const query = graphql`
  query EpidodeQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        topics
        audio {
          url
        }
        speakers {
          id
          name
        }
      }
    }
  }
`
