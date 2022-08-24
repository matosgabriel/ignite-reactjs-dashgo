import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Input } from '~/components/Form/Input';
import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Formato inválido').required('E-mail obrigatório'),
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Senha obrigatória'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Confirmação de senha obrigatória')
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema)
  });
  
  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    console.log(values);
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["3", "6"]}>
        <Sidebar />
        
        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} as="form" onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                <Input
                  name="name"
                  label="Nome completo"
                  error={formState.errors.name}
                  {...register('name')}
                />
                <Input
                  name="email"
                  label="E-mail"
                  error={formState.errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  error={formState.errors.password}
                  {...register('password')}
                />
                <Input
                  name="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  error={formState.errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>Salvar</Button>
              </HStack>
            </Flex>
        </Box>
      </Flex>
    </Box>
  );
}