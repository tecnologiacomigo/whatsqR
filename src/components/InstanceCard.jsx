import React from 'react'
import { Box, VStack, Text, Badge, Button } from '@chakra-ui/react'

function InstanceCard({ instance, onManage }) {
  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg" 
      shadow="sm"
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">{instance.phone}</Text>
        <Badge 
          colorScheme={instance.connected ? 'green' : 'red'}
        >
          {instance.connected ? 'Connected' : 'Disconnected'}
        </Badge>
        <Button 
          size="sm" 
          colorScheme="blue" 
          onClick={() => onManage(instance)}
        >
          Manage
        </Button>
      </VStack>
    </Box>
  )
}

export default InstanceCard
