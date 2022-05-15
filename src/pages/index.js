import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import loadable from '@loadable/component';

// const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const apikey = "APtxwk5KVRsy0bq7q4ev1z"

const pickerConfig = {
  fromSources: ['local_file_system']
}

let ReactFilestack;
if (typeof window !== 'undefined' && window !== null) {
    ReactFilestack = require('filestack-react').PickerInline;
} else {
  return <></>
}

console.log(ReactFilestack)

  return (
    <Layout location={location} title={siteTitle}>
      <span className="mb-2 text-center p-1">Da wir an dem Abend nicht überall dabei sein können, würden wir uns freuen, ein paar Schnapschüße von euch zu bekommen. Daher einfach fotografieren und kurz eure Aufgabe im text beschreiben :-)</span>
      <ReactFilestack
        apikey={apikey}
        onSuccess={(res) => console.log(res)}
        pickerOptions={pickerConfig}
      />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
