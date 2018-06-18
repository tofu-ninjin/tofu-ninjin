import React from 'react'
import { navigateTo } from 'gatsby-link'
import { Card, Header, Image } from 'semantic-ui-react'
import { generateSubtitle } from '../helpers/episode'

export default class IndexPage extends React.Component {
  render() {
    const episodes = this.props.data.allMarkdownRemark.edges

    return (
      <Card.Group>
        {episodes.map(({ node }) => {
          const subtitle = generateSubtitle(node.frontmatter.topics, node.frontmatter.speakers)

          return (
            <Card
              fluid
              link
              key={node.fields.slug}
              style={{ margin: '.5em' }}
              href={node.fields.slug}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(node.fields.slug)
              }}
            >
              <Card.Content>
                <Card.Header>
                  <Header as='h2'>{node.frontmatter.title}</Header>
                </Card.Header>
                <Card.Meta>
                  {node.frontmatter.date}
                </Card.Meta>
                <Card.Description>
                  {subtitle}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {node.frontmatter.speakers.map((speaker) => {
                  return (
                    <Image src={speaker.imageUrl} key={speaker.id} avatar />
                  )
                })}
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            topics
            speakers {
              id
              name
              imageUrl
            }
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
