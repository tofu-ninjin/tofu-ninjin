import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container, Header, Icon, Image, List, Segment } from 'semantic-ui-react'
import styles from './speaker.module.scss'

export default class SpeakerTemplate extends React.Component {
  render() {
    const speaker = this.props.data.speakersYaml
    const episodes = this.props.data.allMarkdownRemark.edges
      .map((edge) => edge.node)
      .filter((node) => {
      return node.frontmatter.speakers.some((s) => {
        return s.id === speaker.id
      })
    })

    return (
      <div>
        <Helmet title={`${speaker.name} | 出演者`} />
        <Segment>
          <Image src={speaker.imageUrl} size='small' centered circular></Image>
          <Header as='h2' textAlign='center' className={styles.header}>
            <Header.Content>
              <span className={styles.headerName}>{speaker.name}</span>
              <a href={`https://github.com/${speaker.github}`} target='_blank'>
                <Icon name='github'></Icon>
              </a>
              <a href={`https://twitter.com/${speaker.twitter}`} target='_blank'>
                <Icon name='twitter'></Icon>
              </a>
            </Header.Content>
          </Header>

          <div className={styles.episodeList}>
            <Header as='h2'>出演一覧</Header>
            <List size='big'>
              {episodes.map((episode) => {
                return (
                  <List.Item key={episode.fields.slug}>
                    <Link to={episode.fields.slug}>{episode.frontmatter.title}</Link>
                  </List.Item>
                )
              })}
            </List>
          </div>
        </Segment>
      </div>
    )
  }
}

export const query = graphql`
  query SpeakerQuery($slug: String!) {
    speakersYaml(fields: { slug: { eq: $slug } }) {
      id
      name
      imageUrl
      twitter
      github
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ){
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            speakers {
              id
            }
          }
        }
      }
    }
  }
`
