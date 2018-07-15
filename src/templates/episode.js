import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Grid, Icon, Image, Segment } from 'semantic-ui-react'
import AudioPlayer from '../components/audio-player'
import { generateSubtitle } from '../helpers/episode'
import styles from './episode.module.scss'

export default class EpisodeTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const subtitle = generateSubtitle(post.frontmatter.topics, post.frontmatter.speakers)
    const episodeUrl = this.props.data.site.siteMetadata.siteUrl + this.props.location.pathname
    const escapedTitle = encodeURIComponent(post.frontmatter.title)
    const escapedEpisodeUrl = encodeURIComponent(episodeUrl)
    const tweetUrl = `https://twitter.com/intent/tweet?text=${escapedTitle}&hashtags=Tofuにんじん&url=${escapedEpisodeUrl}`

    return (
      <div>
        <Helmet
          title={post.frontmatter.title}
          meta={[
            { name: 'description', content: subtitle },
            { property: 'og:title', content: post.frontmatter.title },
            { property: 'og:description', content: subtitle },
            { property: 'og:url', content: episodeUrl }
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
          >
          </div>
          <div className={styles.shareButtons}>
            <a href={tweetUrl} target='_blank' >
              <Icon
                circular link
                color='blue'
                name='twitter'
                size='large'
              />
            </a>
          </div>
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
