import React, { useState } from 'react'
import { 
  Box, 
  VStack, 
  Heading, 
  Text,
  Button,
  Container
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import QRCodeScanner from '../components/QRCodeScanner'

function ClientPortal() {
  const { phone } = useParams()
  const navigate = useNavigate()

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={6}>
        <Heading size="lg">Conexão WhatsApp</Heading>
        <Text fontSize="lg">Telefone: {phone}</Text>
        <QRCodeScanner instanceId={phone} />
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
        >
          Voltar ao Início
        </Button>
      </VStack>
    </Container>
  )
}

export default ClientPortal
