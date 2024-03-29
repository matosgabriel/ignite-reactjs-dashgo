import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', { params: { page } });

  const users = data.users.map(user => ({
    ...user,
    createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }));

  const totalCount = Number(headers['x-total-count']);

  return { users, totalCount };
}

function useUsers(page: number) {
 return useQuery(['users', page], () => getUsers(page), {
  staleTime: 1000 * 60 * 10 // 10 minutes
});
}

export { useUsers }
