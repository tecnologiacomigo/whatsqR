import React, { useState } from 'react'
import { 
  Box, 
  VStack, 
  Input, 
  Button, 
  Heading, 
  useToast,
  Container
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  const handleClientAccess = () => {
    if (!phone) {
      toast({
        title: 'Erro',
        description: 'Digite um número de telefone',
        status: 'error',
        duration: 3000
      })
      return
    }
    navigate(`/client/${phone}`)
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={6}>
        <Heading>WhatsApp Connect</Heading>
        
        <VStack w="100%" spacing={4} p={6} borderWidth="1px" borderRadius="lg">
          <Input
            placeholder="Digite seu número de telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button 
            colorScheme="blue" 
            w="100%"
            onClick={handleClientAccess}
          >
            Acessar QR Code
          </Button>
        </VStack>

        <Button 
          variant="outline"
          onClick={() => navigate('/admin')}
        >
          Área Administrativa
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
