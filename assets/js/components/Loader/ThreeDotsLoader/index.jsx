import React from 'react'
import ContentLoader from 'react-content-loader'

const ThreeDotsLoader = props => (
  <ContentLoader
    viewBox="0 0 400 100"
    height={100}
    width={275}
    backgroundColor="#ffb64a"
    {...props}
  >
    <circle cx="155" cy="86" r="8" />
    <circle cx="199" cy="86" r="8" />
    <circle cx="243" cy="86" r="8" />
  </ContentLoader>
)

export default ThreeDotsLoader;