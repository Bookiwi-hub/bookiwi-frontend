/* eslint-disable react/no-array-index-key */
import { Link } from "expo-router";
import { Image, Text, ImageSourcePropType, View } from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAIN_COLOR } from "@/constants/colors";
import { EllipsisVertical } from "@/lib/icons/ellipsis-vertical";

interface KiwiCardProps {
  image: ImageSourcePropType;
  kiwiTitle: string;
  bookTitle: string;
  description: string;
  participants: number;
  progress: number;
}

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
      <Link
        href={{
          pathname: "/(tabs)/(my-kiwis)/[kiwi]",
          params: { kiwi: kiwiTitle },
        }}
      >
        <CardContent className="flex-row h-full p-6 gap-4">
          <Image
            source={image}
            className="w-2/5 h-full rounded-md"
            resizeMode="cover"
          />
          <View className="flex-1 flex justify-between">
            <View>
              <CardTitle>{kiwiTitle}</CardTitle>
              <CardTitle className="text-md text-gray-500">
                {bookTitle}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </View>
            <View>
              <View className="flex flex-row justify-end mb-3">
                <Text>{participants}명 참여</Text>
              </View>
              <Progress value={progress} />
            </View>
          </View>
        </CardContent>
      </Link>
      <EllipsisVertical
        color={MAIN_COLOR}
        className="absolute cursor-pointer top-6 right-4"
        onPress={() => {
          console.log("ellipsis");
        }}
      />
    </Card>
  );
}
