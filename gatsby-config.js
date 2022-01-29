module.exports = {
  siteMetadata: {
    siteUrl: `https://dillionmegida.com`,
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
        name: `contents`,
        path: `${__dirname}/data/`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
    },
  ],
}
