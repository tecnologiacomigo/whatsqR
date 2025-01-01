import React, { useState } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Heading,
  useToast,
  Container,
  Text,
  Flex,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const handleClientAccess = () => {
    if (!phone) {
      toast({
        title: 'Erro',
        description: 'Digite um número de telefone',
        status: 'error',
        duration: 3000
      });
      return;
    }
    navigate(`/client/${phone}`);
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-b, blue.500, purple.600)"
      align="center"
      justify="center"
    >
      <Container
        maxW="container.sm"
        bg={bg}
        borderRadius="lg"
        boxShadow="xl"
        p={8}
        mx={4}
      >
        <VStack spacing={6} textAlign="center">
          <Flex
            justify="center"
            align="center"
            bg="blue.500"
            borderRadius="full"
            p={6}
            boxShadow="md"
          >
            <Icon as={PhoneIcon} w={12} h={12} color="white" />
          </Flex>
          <Heading size="xl" color="blue.600">
            Bem-vindo ao Clube.AI
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Conecte-se ao WhatsApp de forma rápida e segura
          </Text>

          <VStack w="100%" spacing={4} p={6} bg="gray.50" borderRadius="lg">
            <Input
              placeholder="Digite seu número de telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="lg"
              bg="white"
            />
            <Button
              colorScheme="blue"
              w="100%"
              size="lg"
              onClick={handleClientAccess}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Conectar WhatsApp
            </Button>
          </VStack>

          <Text fontSize="sm" color="gray.500">
            Sua conexão segura com o WhatsApp
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
}

export default Home;
