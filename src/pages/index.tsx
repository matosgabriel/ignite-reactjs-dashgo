import Head from 'next/head';
import { Button, Flex, Stack } from '@chakra-ui/react';
import { Input } from '~/components/Form/Input';
import { useRouter } from 'next/router';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { SubmitHandler, useForm } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Formato inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const { push } = useRouter();
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log(values);
    
    push('dashboard');
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            {...register('email', { required: 'E-mail obrigatório' })}
            error={formState.errors.email}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            {...register('password')} 
            error={formState.errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>  
    </Flex>
    </>
  );
}
