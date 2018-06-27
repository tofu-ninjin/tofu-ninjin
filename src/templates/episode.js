import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Grid, Image, Segment } from 'semantic-ui-react'
import AudioPlayer from '../components/audio-player'
import { generateSubtitle } from '../helpers/episode'
import styles from './episode.module.scss'

export default class EpisodeTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const subtitle = generateSubtitle(post.frontmatter.topics, post.frontmatter.speakers)

    return (
      <div>
        <Helmet
          title={post.frontmatter.title}
          meta={[
            { name: 'description', content: subtitle },
            { property: 'og:title', content: post.frontmatter.title },
            { property: 'og:description', content: subtitle },
            { property: 'og:url', content: this.props.data.site.siteMetadata.siteUrl + this.props.location.pathname }
          ]}
        />
        <Segment>
          <h1>{post.frontmatter.title}</h1>
          <p>{subtitle}</p>
          <AudioPlayer src={post.frontmatter.audio.url}></AudioPlayer>
          <div className={styles.speakers}>
            <Grid doubling columns={3}>
              {post.frontmatter.speakers.map((speaker) => {
                return (
                  <Grid.Column key={speaker.id}>
                    <Link to={speaker.fields.slug}>
                      <Image src={speaker.imageUrl} avatar />
                      <span>{speaker.name}</span>
                    </Link>
                  </Grid.Column>
                )
              })}
            </Grid>
          </div>
          <div
            className={styles.episodeContent}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Segment>
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
        topics
        audio {
          url
        }
        speakers {
          id
          name
          imageUrl
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
