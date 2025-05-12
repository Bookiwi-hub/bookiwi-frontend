import { Plus } from "lucide-react";

import KiwiCard from "./kiwi-card";
import LinkInput from "./link-input";

import { Button } from "#/components/ui/button";
import { Kiwi } from "#/types/kiwi";

interface KiwisProps {
  kiwis: Kiwi[];
}

export default function Kiwis({ kiwis }: KiwisProps) {
  return (
    <div className="w-full">
      {kiwis.length === 0 ? (
        <Button
          variant="outline"
          className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 border border-dashed bg-transparent transition-colors hover:border-primary hover:bg-primary/5"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus size={20} />
            <span>새로운 키위 만들기</span>
          </div>
          <p className="text-sm text-muted-foreground">
            책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.
          </p>
        </Button>
      ) : (
        <>
          <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">내 키위</h2>
              <div className="flex items-center gap-2">
                <LinkInput />
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus size={16} />새 키위 만들기
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {kiwis.map((kiwi) => (
              <KiwiCard key={kiwi.id} kiwi={kiwi} />
            ))}
          </div>
        </>
      )}

      {/* <CreateBookRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBookRoom={onCreateBookRoom}
      /> */}
    </div>
  );
}
