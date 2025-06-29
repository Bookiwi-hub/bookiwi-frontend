import { Image, Text, ImageSourcePropType } from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KiwiCardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  participants: number;
  progress: number;
}

export default function KiwiCard({
  image,
  title,
  description,
  participants,
  progress,
}: KiwiCardProps) {
  return (
    <Card className="w-full max-w-64 h-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <Image source={image} className="w-full h-full" resizeMode="cover" />
      </CardContent>
      <CardFooter>
        <Text>{participants}명 참여</Text>
        <Text>{progress}% 읽음</Text>
      </CardFooter>
    </Card>
  );
}
