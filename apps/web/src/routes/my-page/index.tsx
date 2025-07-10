import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { LogOut, BookOpen } from "lucide-react";
import { toast } from "sonner";

import Header from "#/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import userManager from "#/managers/user";

export const Route = createFileRoute("/my-page/")({
  beforeLoad: async () => {
    const loggedIn = await userManager.isLoggedIn();
    if (!loggedIn) {
      throw redirect({ to: "/auth" });
    }
  },
  component: MyPage,
});

function MyPage() {
  const { user } = userManager;
  if (!user) {
    throw redirect({ to: "/auth" });
  }
  const { name, email, profileImage } = user;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await userManager.logout();
      await router.navigate({ to: "/auth" });
    } catch (error) {
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const getInitials = (fullName: string) =>
    fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-gray-50 p-6 mobile:p-4">
        <div className="mx-auto max-w-lg space-y-6">
          {/* 프로필 카드 */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-white py-8">
              <div className="flex flex-col items-center text-center">
                <Avatar className="size-20 border-4 border-gray-200 shadow-lg">
                  <AvatarImage src={profileImage ?? undefined} alt={name} />
                  <AvatarFallback className="bg-gray-100 text-2xl font-bold text-gray-700">
                    {name ? getInitials(name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {name || "사용자"}
                  </CardTitle>
                  <p className="mt-2 text-sm text-gray-600">
                    {email || "이메일 없음"}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 내 키위 메뉴 */}
          <Link to="/my-kiwis">
            <Card className="cursor-pointer border-0 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gray-100">
                    <BookOpen className="size-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">내 키위</h3>
                    <p className="text-sm text-gray-600">
                      읽고 있는 책들을 확인하세요
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 로그아웃 버튼 */}
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-center space-x-2 border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
              >
                <LogOut className="size-4" />
                <span>로그아웃</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
