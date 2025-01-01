import React, { useEffect, useState } from 'react'
import { 
  Box, 
  VStack, 
  Image, 
  Text, 
  Button,
  useToast 
} from '@chakra-ui/react'
import LoadingSpinner from './LoadingSpinner'
import { connectInstance } from '../services/api'

function QRCodeScanner({ instanceId }) {
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const toast = useToast()

  const fetchQR = async () => {
    try {
      setLoading(true)
      const response = await connectInstance(instanceId)
      
      // Verifica se temos o QR code na resposta
      if (response.data && response.data.base64) {
        setQrCode(response.data.base64)
      } else {
        toast({
          title: 'QR Code não disponível',
          description: 'Tentando novamente...',
          status: 'warning',
          duration: 3000
        })
      }
    } catch (error) {
      toast({
        title: 'Erro ao carregar QR Code',
        description: 'Tente novamente',
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQR()
    const interval = setInterval(fetchQR, 30000)
    return () => clearInterval(interval)
  }, [instanceId])

  if (loading) {
    return <LoadingSpinner message="Carregando QR Code..." />
  }

  return (
    <VStack spacing={4} p={6}>
      <Text fontSize="lg">Escaneie o QR Code para conectar o WhatsApp</Text>
      {qrCode ? (
        <Box boxSize="300px">
          <Image 
            src={qrCode} 
            alt="WhatsApp QR Code"
          />
        </Box>
      ) : (
        <Button 
          colorScheme="blue" 
          onClick={() => {
            setRetryCount(c => c + 1)
            fetchQR()
          }}
        >
          Tentar Novamente ({retryCount})
        </Button>
      )}
    </VStack>
  )
}

export default QRCodeScanner
