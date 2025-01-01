import React from 'react'
import { 
  Box, 
  Heading,
  Text,
  Container,
  Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <Container maxW="container.lg" py={8}>
      <Box textAlign="center">
        <Heading mb={6}>Painel Administrativo</Heading>
        <Text mb={4}>Área em desenvolvimento</Text>
        <Button onClick={() => navigate('/')}>
          Voltar ao Início
        </Button>
      </Box>
    </Container>
  )
}

export default AdminDashboard
