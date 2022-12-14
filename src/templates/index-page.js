import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";

import LatestStory from "../components/LatestStory";
import TopStory from "../components/TopStories";
import Suggested from "../components/Suggested";

import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="new_section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  {/* <div className="content">
                        <div className="tile">
                          <h1 className="title">{mainpitch.title}</h1>
                        </div>
                        <div className="tile">
                          <h3 className="subtitle">{mainpitch.description}</h3>
                        </div>
                      </div> 
                      <div className="columns">
                        <div className="column is-12">
                          <h3 className="has-text-weight-semibold is-size-2">
                            {heading}
                          </h3>
                          <p>{description}</p>
                        </div>
                      </div>
                  */}
                  {/* 
                  <Features gridItems={intro.blurbs} />
                  */}
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <LatestStory />

                  <h3 className="has-text-weight-semibold is-size-2">
                    Top stories
                  </h3>
                  <TopStory />

                  <h3 className="has-text-weight-semibold is-size-2">
                    Suggested for you
                  </h3>
                  <Suggested />

                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/latest-story">
                      Find out more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
