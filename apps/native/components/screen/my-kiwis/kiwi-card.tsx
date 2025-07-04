/* eslint-disable react/no-array-index-key */
import { Image, Text, ImageSourcePropType, View } from "react-native";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils/cn";

interface KiwiCardProps {
  image: ImageSourcePropType;
  kiwiTitle: string;
  bookTitle: string;
  description: string;
  participants: number;
  progress: number;
}

const mock = [
  {
    name: "Aohn Doe",
    imageUrl: require("../../../assets/images/book-cover-ex.png"),
    fallback: "bg-red-500",
    alt: "avatar1",
  },
  {
    name: "Bohn Doe",
    imageUrl: require("../../../assets/images/book-cover-ex.png"),
    fallback: "bg-yellow-500",
    alt: "avatar1",
  },
  {
    name: "Cohn Doe",
    imageUrl: require("../../../assets/images/book-cover-ex.png"),
    fallback: "bg-green-500",
    alt: "avatar1",
  },
];

export default function KiwiCard({
  image,
  kiwiTitle,
  bookTitle,
  description,
  participants,
  progress,
}: KiwiCardProps) {
  return (
    <Card className="w-full h-60">
      <CardContent className="flex-row h-full p-6 gap-4">
        <Image
          source={image}
          className="w-2/5 h-full rounded-md"
          resizeMode="cover"
        />
        <View className="flex-1 flex justify-between">
          <View>
            <CardTitle>{kiwiTitle}</CardTitle>
            <CardTitle className="text-md text-gray-500">{bookTitle}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </View>
          <View>
            <View className="flex flex-row justify-end mb-3">
              {mock.map((item, idx) => (
                <Avatar
                  key={idx}
                  alt={item.alt}
                  className={cn(
                    "border-2 border-white",
                    idx !== 0 ? "-ml-3" : "",
                  )}
                >
                  {/* <AvatarImage source={item.imageUrl} /> */}
                  <AvatarFallback className={item.fallback}>
                    <Text className="text-white font-semibold">
                      {item.name.slice(0, 1)}
                    </Text>
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar
                className="-ml-3 border-2 border-white bg-blue-500 flex items-center justify-center"
                alt="avatar"
              >
                <Text className="text-white font-semibold">
                  + {participants}
                </Text>
              </Avatar>
            </View>
            <Progress value={progress} />
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
