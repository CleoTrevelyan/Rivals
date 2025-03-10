import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EventCardProps } from "@/interface/types";
import { homeStyles } from "@/styles/homeStyles";

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={homeStyles.eventCard} onPress={onPress}>
      <View style={homeStyles.eventCardContent}>
        <Text style={homeStyles.eventTitle}>{event.title}</Text>
        <Text style={homeStyles.eventDescription}>{event.description}</Text>

        {/* Conditionally render either a button or score based on event type */}
        {event.buttonText ? (
          <TouchableOpacity
            style={
              event.buttonType === "stake"
                ? homeStyles.stakeButton
                : homeStyles.requestButton
            }
          >
            <Text
              style={
                event.buttonType === "stake"
                  ? homeStyles.stakeButtonText
                  : homeStyles.requestButtonText
              }
            >
              {event.buttonText}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          event.score && (
            <View style={homeStyles.scoreContainer}>
              <Text style={homeStyles.scoreText}>{event.score}</Text>
              <Text style={homeStyles.timeText}>{event.time}</Text>
            </View>
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
