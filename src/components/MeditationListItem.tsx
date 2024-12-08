import { View, Text, Pressable } from "react-native";
import React from "react";
import { Meditation } from "../types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

export default function MeditationListItem({
  meditation,
}: {
  meditation: Meditation;
}) {
  return (
    <Link href={`/meditation/${meditation.id}`} asChild>
      <Pressable className="flex-row items-center gap-5">
        <View className="bg-green-500 rounded-full p-2 ">
          <FontAwesome name="check" size={16} color="white" />
        </View>
        <View className="flex-1 p-5 py-8 border-2 border-gray-300 rounded-2xl ">
          <Text className="font-semibold text-2xl mb-2">
            {meditation.title}
          </Text>
          <View className="flex flex-row items-center gap-3">
            <FontAwesome6 name="clock" size={16} color="#6B7280" />
            <Text className="text-gray-600">{meditation.duration} min</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
