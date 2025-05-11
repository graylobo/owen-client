"use client";
import { useState } from "react";
import { useGetAllUsers, useUpdateUserStatus } from "@/hooks/api/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/services/user/user.dto";

const statusBadgeStyle: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

export default function AccountManagement() {
  const { data: users = [], isLoading, error } = useGetAllUsers();
  const updateUserStatusMutation = useUpdateUserStatus();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await updateUserStatusMutation.mutateAsync({ userId, status: newStatus });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const filteredUsers =
    statusFilter === "all"
      ? users
      : users.filter((user: User) => user.status === statusFilter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium">사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-red-600">
          오류가 발생했습니다. 다시 시도해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          계정 요청 생성 관리
        </h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="status-filter" className="font-medium text-gray-700">
            상태 필터:
          </label>
          <select
            id="status-filter"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="pending">대기중</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 font-medium text-gray-500">이름</th>
              <th className="px-6 py-3 font-medium text-gray-500">이메일</th>
              <th className="px-6 py-3 font-medium text-gray-500">유형</th>
              <th className="px-6 py-3 font-medium text-gray-500">상태</th>
              <th className="px-6 py-3 font-medium text-gray-500">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  사용자가 없습니다.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user: User) => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusBadgeStyle[user.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(user.id, e.target.value)
                      }
                      disabled={updateUserStatusMutation.isPending}
                    >
                      <option value="active">활성</option>
                      <option value="inactive">비활성</option>
                      <option value="pending">대기중</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
