import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, VStack, Image, Text } from '@chakra-ui/react'
import { fetchQRCode } from '../services/api'

function ClientPanel() {
  const { phone } = useParams()
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    const connectInstance = async () => {
      try {
        const response = await fetchQRCode(phone)
        setQrCode(response.data.qrcode)
      } catch (error) {
        console.error('Error fetching QR code:', error)
      }
    }

    connectInstance()
  }, [phone])

  return (
    <VStack spacing={4} p={8}>
      <Text fontSize="xl">Escaneie o QR Code para conectar seu WhatsApp</Text>
      {qrCode && (
        <Box boxSize="300px">
          <Image src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
        </Box>
      )}
    </VStack>
  )
}

export default ClientPanel
