import React, { useEffect, useState } from 'react'
import { Box, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { fetchInstances } from '../services/api'

function AdminPanel() {
  const [instances, setInstances] = useState([])

  useEffect(() => {
    const getInstances = async () => {
      try {
        const response = await fetchInstances()
        setInstances(response.data)
      } catch (error) {
        console.error('Error fetching instances:', error)
      }
    }

    getInstances()
  }, [])

  return (
    <Box p={8}>
      <Text fontSize="2xl" mb={4}>Instâncias WhatsApp</Text>
      <SimpleGrid columns={3} spacing={4}>
        {instances.map((instance) => (
          <Box 
            key={instance.id} 
            p={4} 
            border="1px" 
            borderColor="gray.200" 
            borderRadius="md"
          >
            <Text>Número: {instance.phone}</Text>
            <Text>Status: {instance.status}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default AdminPanel
