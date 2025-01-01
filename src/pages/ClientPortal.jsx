import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  Image,
  Text,
  Center,
  Spinner,
  Heading,
  useColorModeValue,
  Flex,
  Button
} from '@chakra-ui/react';
import { fetchQRCode } from '../services/api';

function ClientPortal() {
  const { phone } = useParams();
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const bg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const getQRCode = async () => {
      setIsLoading(true);
      try {
        const response = await fetchQRCode(phone);
        if (response && response.data && response.data.base64) {
          setQrCode(response.data.base64);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getQRCode();
    const interval = setInterval(getQRCode, 30000);
    return () => clearInterval(interval);
  }, [phone]);

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-b, blue.500, purple.600)"
      align="center"
      justify="center"
    >
      <VStack
        spacing={8}
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        bg={bg}
        maxW="md"
        w="full"
        mx={4}
      >
        <Flex
          justify="center"
          align="center"
          bgGradient="linear(to-b, blue.500, purple.600)"
          borderRadius="full"
          p={4}
          boxShadow="md"
        >
          <Image
            src="https://clube.ai/wp-content/uploads/2024/12/LOGO.png"
            alt="Clube.AI Logo"
            boxSize="80px"
          />
        </Flex>
        <Heading size="lg" color="blue.600">
          Clube.AI - Conexão WhatsApp
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="gray.600">
          Escaneie o QR Code abaixo com seu celular:
        </Text>
        {isLoading ? (
          <Spinner size="xl" color="blue.500" />
        ) : qrCode ? (
          <Image
            src={qrCode}
            alt="QR Code"
            boxSize="250px"
            borderRadius="md"
            shadow="md"
          />
        ) : (
          <Text color="red.500">Erro ao carregar o QR Code. Tente novamente mais tarde.</Text>
        )}
        <Text fontSize="sm" color="gray.500">
          Este QR Code expira em 30 segundos.
        </Text>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          Voltar ao Início
        </Button>
      </VStack>
    </Flex>
  );
}

export default ClientPortal;
