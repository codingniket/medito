import { Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { meditations } from "../../../data";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import audio from "../../../assets/meditations/audio1.mp3";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function details() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const player = useAudioPlayer(audio);
  const status = useAudioPlayerStatus(player);

  const meditation = meditations.find((m) => m.id === Number(id));

  const formatSeconds = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!meditation) {
    return <Text>Take a break</Text>;
  }
  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      <AnimatedBackground />
      {/* Page content */}
      <View className="flex-1">
        {/* Top part of the screen */}
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between p-10">
            <Entypo name="info-with-circle" size={24} color="white" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">Medito</Text>
            </View>
            <FontAwesome
              name="close"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
          </View>

          <Text className="text-3xl mt-20 text-center text-zinc-800 font-bold">
            {meditation?.title}
          </Text>
        </View>

        {/* Play/Pause Button */}
        <Pressable
          onPress={() => (player.playing ? player.pause() : player.play())}
          className="bg-zinc-800 self-center w-20 aspect-square rounded-full items-center justify-center"
        >
          <FontAwesome6
            name={status.playing ? "pause" : "play"}
            size={24}
            color="snow"
          />
        </Pressable>

        {/* Bottom part of the screen */}
        <View className="flex-1">
          {/* Footer: Player */}
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="white" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="white"
              />
            </View>

            {/* Playback indicator */}
            <Slider
              style={{ width: "100%", height: 3 }}
              value={status.currentTime / status.duration}
              onSlidingComplete={(value) =>
                player.seekTo(value * status.duration)
              }
              minimumValue={0}
              maximumValue={1}
              maximumTrackTintColor="#3A393755"
              minimumTrackTintColor="#3A3937"
              thumbTintColor="#3A3937"
            />
            {/* Times */}
            <View className="flex-row justify-between">
              <Text>{formatSeconds(status.currentTime)}</Text>
              <Text>{formatSeconds(status.duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
