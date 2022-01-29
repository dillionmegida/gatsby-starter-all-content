module.exports = {
  siteMetadata: {
    siteUrl: `Enter site url`,
  },
  plugins: [
    `gatsby-plugin-sass`,

    // for parsing YAML files
    `gatsby-transformer-yaml`,

    // React Helmet for populating thehead tag
    `gatsby-plugin-react-helmet`,

    // For handling file sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/data/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/data/contents/`,
      },
    },
  ],
}
