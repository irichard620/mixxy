import dynamicLinks from '@react-native-firebase/dynamic-links'
import { useEffect } from 'react'

/**
 * @return {null}
 */

export default function DynamicLinkListener(props) {
  const { handleDynamicLink } = props

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)
    // When the is component unmounted, remove the listener
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => handleDynamicLink(link))
  }, [])

  return null
}
