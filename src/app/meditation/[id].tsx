import { Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { meditations } from "../../../data";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

export default function details() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Take a break</Text>;
  }
  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      {/* Header */}
      <View className="flex-row items-center justify-between p-10">
        <Entypo name="info-with-circle" size={24} color="white" />

        <View className="bg-zinc-800 p-2 rounded-md">
          <Text className="text-zinc-100 font-semibold">
            {meditation?.title}
          </Text>
        </View>
        <FontAwesome
          name="close"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}
