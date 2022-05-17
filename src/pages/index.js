import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import loadable from '@loadable/component';

// const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [task, setTask] = React.useState(1)

  const apikey = "APtxwk5KVRsy0bq7q4ev1z"

  const handleChange = (event) => {
    setTask(event.target.value)
  }

const pickerConfig = {
  fromSources: ['local_file_system'],
  accept: 'image/*',
  maxSize: 1024 * 1024 * 5,
  storeTo: {
    path: `/${task}/`
  },
  uploadConfig: {
    tags: {
       "task": `${task}`
    }
  },
  customText: {
    "Select Files to Upload": "Foto auswählen"
  }
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
      <span className="mb-2 text-center p-1">
      Da wir an dem Abend nicht überall dabei sein können, würden wir uns freuen, ein paar Schnappschüße von euch zu bekommen. Dazu haben wir euch an eure Plätze eine Aufgabe hinterlegt. Einfach unten eure Aufgabennummer auswählen und danach das Bild auswählen und hochladen :-)</span>
      <div className="list-container mb-2">
        <span className="mb-1">Aufgabe:</span>
        {/* <input type="text" name="example" list="exampleList" /> */}
        <select id="exampleList" className="list" onChange={handleChange}>
          <optgroup className="opt" label="">
          {
            Array.from(Array(60).keys()).map(no => {
              return (<option key={no} value={no + 1}>{no + 1}</option> )
            })
          }
          </optgroup>
        </select>
      </div>
      <ReactFilestack
        apikey={apikey}
        onSuccess={(res) => {
          if(res.filesUploaded.length > 0) {
            alert("Danke :-)")
          }
          console.log(res)
        }}
        pickerOptions={pickerConfig}
        onFileSelected={(file) => {
          console.log(file)
          // It's important to return a new file by the end of this function.
          return { ...file, name: 'foo' };
        }}
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
