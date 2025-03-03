import {
  deleteTransactionAPI,
  editTransactionAPI,
  getTransactionDetailsAPI,
  getTransactions,
  getTransactionsAPI,
  ITransaction,
} from "@/apis/transaction.api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetTransactions = (getTransactions: getTransactions) => {
  return useQuery({
    queryKey: ["transactions", getTransactions],
    queryFn: () => getTransactionsAPI(getTransactions),
  });
};

export interface GetTransactionsParams {
  limit: number;
  page: number;
  search?: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  createdAt: string;
  category?: {
    name: string;
    icon: string;
  };
  description: string;
}

export interface TransactionResponse {
  data: {
    transactions: Transaction[];
  };
}

export const useGetTransactionsInfinity = (search: string = "") => {
  return useInfiniteQuery<TransactionResponse, Error>({
    queryKey: ["transactions", search],
    queryFn: ({ pageParam = 1 }) =>
      getTransactionsAPI({ limit: 10, page: pageParam as number, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.transactions.length < 10) return undefined;
      return allPages.length + 1;
    },
  });
};
export const useTransactionDetails = (_id: string) => {
  return useQuery({
    queryKey: ["transactions", _id],
    queryFn: () => getTransactionDetailsAPI(_id),
  });
};
export const useEditTransaction = () => {
  return useMutation({
    mutationFn: (transaction: ITransaction) => {
      return editTransactionAPI(transaction);
    },
    mutationKey: ["edit-transactions"],
  });
};
export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return deleteTransactionAPI(id);
    },
    mutationKey: ["delete-transactions"],
  });
};
