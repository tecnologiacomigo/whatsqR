import React from 'react'
import { VStack, Spinner, Text } from '@chakra-ui/react'

function LoadingSpinner({ message }) {
  return (
    <VStack spacing={4}>
      <Spinner size="xl" color="blue.500" />
      <Text>{message}</Text>
    </VStack>
  )
}

export default LoadingSpinner
