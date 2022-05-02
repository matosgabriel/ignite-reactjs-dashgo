import Head from 'next/head'
import { Button, Flex, FormLabel, Stack, FormControl } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    
    <Flex
      w="100vw"
      height="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        flexDir="column"
      >

        <Stack spacing="4">
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Senha" type="password" />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>  
    </Flex>
    </>
  );
}
