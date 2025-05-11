"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";

// 마스터시트 고정 항목
const MASTER_COLUMNS = [
  "수령인",
  "연락처",
  "주소",
  "주문번호",
  "상품명",
  "수량",
  "배송메모",
];

interface ClientMapping {
  id: string;
  name: string;
  mappings: Record<string, string>; // 마스터컬럼: 거래처컬럼별칭
}

function ClientManagement() {
  const [clients, setClients] = useState<ClientMapping[]>([]);
  const [newClient, setNewClient] = useState<ClientMapping>({
    id: "",
    name: "",
    mappings: Object.fromEntries(MASTER_COLUMNS.map((col) => [col, ""])),
  });
  const [isAddingClient, setIsAddingClient] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field === "name") {
      setNewClient({
        ...newClient,
        id: Date.now().toString(), // 임시 ID 생성
        name: value,
      });
    } else {
      setNewClient({
        ...newClient,
        mappings: {
          ...newClient.mappings,
          [field]: value,
        },
      });
    }
  };

  const handleAddClient = () => {
    if (!newClient.name.trim()) {
      alert("거래처명을 입력해 주세요.");
      return;
    }

    // 새 거래처 추가
    setClients([...clients, { ...newClient }]);

    setNewClient({
      id: "",
      name: "",
      mappings: Object.fromEntries(MASTER_COLUMNS.map((col) => [col, ""])),
    });
    setIsAddingClient(false);
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">거래처 관리</h1>
        {!isAddingClient && (
          <Button
            className="btn-primary"
            onClick={() => setIsAddingClient(true)}
          >
            거래처 추가
          </Button>
        )}
      </div>

      {isAddingClient && (
        <ComponentCard title="새 거래처 추가" className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">거래처명</label>
              <Input
                type="text"
                placeholder="거래처 이름을 입력하세요"
                defaultValue={newClient.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-md font-medium mb-2">컬럼 매핑</h3>
              <p className="text-sm text-gray-500 mb-4">
                각 마스터시트 항목에 대해 해당 거래처 엑셀 파일의 컬럼명을
                입력하세요.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MASTER_COLUMNS.map((column) => (
                  <div key={column} className="flex flex-col">
                    <label className="text-sm font-medium mb-1">{column}</label>
                    <Input
                      type="text"
                      placeholder={`${column}에 해당하는 컬럼명`}
                      defaultValue={newClient.mappings[column]}
                      onChange={(e) =>
                        handleInputChange(column, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                className="btn-secondary"
                onClick={() => setIsAddingClient(false)}
              >
                취소
              </Button>
              <Button className="btn-primary" onClick={handleAddClient}>
                저장
              </Button>
            </div>
          </div>
        </ComponentCard>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">등록된 거래처 목록</h2>
        {clients.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">등록된 거래처가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {clients.map((client) => (
              <ComponentCard
                key={client.id}
                title={client.name}
                className="p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">{client.name}</h3>
                  <Button
                    className="btn-outline btn-danger"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    삭제
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(client.mappings).map(
                    ([master, clientCol]) => (
                      <div key={master} className="bg-gray-50 p-3 rounded-md">
                        <span className="text-sm font-medium text-gray-600">
                          {master}:
                        </span>{" "}
                        <span className="text-sm">
                          {clientCol || "매핑되지 않음"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </ComponentCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientManagement;
