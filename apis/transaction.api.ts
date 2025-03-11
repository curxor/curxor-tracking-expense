import axiosInstance from "../services/axios";

export interface getTransactions {
  limit: number;
  page: number;
  search?: string;
  category?: string | null;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
}

export const getTransactionsAPI = async (getTransactions: getTransactions) => {
  const response = await axiosInstance.get("/transaction", {
    params: getTransactions,
  });
  return response.data;
};

export const getTransactionDetailsAPI = async (id: string) => {
  const response = await axiosInstance.get(`/transaction/details?id=${id}`);
  return response.data;
};

export interface ITransaction {
  _id: string;
  description: string;
  amount: number;
  category: string;
}

export const editTransactionAPI = async (transaction: ITransaction) => {
  const response = await axiosInstance.put("/transaction", transaction);
  return response.data;
};
export const deleteTransactionAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/transaction/${id}`);
  return response.data;
};
