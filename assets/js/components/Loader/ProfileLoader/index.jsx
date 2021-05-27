import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileLoader = props => (
  <ContentLoader
    speed={2}
    width={250}
    height={130}
    viewBox="0 0 420 170"
    backgroundColor="#ffb64a"
    foregroundColor="#ffe5be"
    {...props}
  >
    <circle cx="208" cy="59" r="49" />
    <circle cx="223" cy="66" r="8" />
    <rect x="135" y="120" rx="0" ry="0" width="156" height="8" />
    <rect x="164" y="137" rx="0" ry="0" width="100" height="8" />
    <rect x="208" y="128" rx="0" ry="0" width="0" height="1" />
    <rect x="207" y="126" rx="0" ry="0" width="1" height="8" />
    <rect x="212" y="166" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default ProfileLoader;