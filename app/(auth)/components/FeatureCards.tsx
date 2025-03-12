import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  LayoutChangeEvent,
} from "react-native";
import { authStyles } from "../styles/authStyles";

// Define card type
type FeatureCard = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  highlight?: string; // Optional highlighted text within title
  isMain?: boolean; // Flag for the main/middle card
};

type FeatureCardsProps = {
  isMobileView: boolean;
  cards: FeatureCard[];
};

const FeatureCards: React.FC<FeatureCardsProps> = ({ isMobileView, cards }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  // Find the index of the main card (or default to middle card)
  const mainCardIndex = cards.findIndex((card) => card.isMain);
  const centerIndex =
    mainCardIndex !== -1 ? mainCardIndex : Math.floor(cards.length / 2);

  // Handle container layout to get width
  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Card dimensions
  const CARD_WIDTH = 250;
  const CARD_MARGIN = 8;
  const CARD_SPACING = CARD_WIDTH + CARD_MARGIN * 2;

  // Calculate initial scroll position - centers the main card
  const getInitialScrollPosition = () => {
    // Calculate offsets
    const totalOffset = centerIndex * CARD_SPACING;
    const centeringOffset = (windowWidth - CARD_WIDTH) / 2;
    return Math.max(0, totalOffset - centeringOffset);
  };

  // Effect to scroll to initial position
  useEffect(() => {
    if (isMobileView && scrollViewRef.current && containerWidth > 0) {
      const scrollPosition = getInitialScrollPosition();
      // Delay scrolling until after render
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: scrollPosition,
          animated: false,
        });
      }, 50);
    }
  }, [isMobileView, containerWidth, centerIndex]);

  // Style for cards
  const styles = StyleSheet.create({
    mobileContainer: {
      width: "100%",
      marginBottom: 40,
      marginTop: 20,
      height: 280,
    },
    scrollView: {
      width: "100%",
    },
    scrollContent: {
      // Add extra padding to allow first and last cards to be centered
      paddingHorizontal: (windowWidth - CARD_WIDTH) / 2,
    },
    card: {
      width: CARD_WIDTH,
      height: 240,
      marginHorizontal: CARD_MARGIN,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    middleCard: {
      width: CARD_WIDTH,
      height: 280,
      marginHorizontal: CARD_MARGIN,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    highlightedText: {
      fontWeight: "bold",
      color: "#02F199",
    },
  });

  const renderTitle = (card: FeatureCard) => {
    if (!card.highlight) {
      return <Text style={authStyles.featureTitle}>{card.title}</Text>;
    }

    // Split the title to insert the highlighted part
    const parts = card.title.split(card.highlight);
    return (
      <Text style={authStyles.featureTitle}>
        {parts[0]}
        <Text style={styles.highlightedText}>{card.highlight}</Text>
        {parts[1]}
      </Text>
    );
  };

  if (isMobileView) {
    // Mobile view with scrolling
    return (
      <View style={styles.mobileContainer} onLayout={onContainerLayout}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={CARD_SPACING}
          decelerationRate="fast"
          snapToAlignment="center"
        >
          {cards.map((card, index) => (
            <View
              key={card.id}
              style={card.isMain ? styles.middleCard : styles.card}
            >
              <Image
                source={card.image}
                style={authStyles.featureCardBackground}
                resizeMode="cover"
              />
              <View style={authStyles.featureCardContent}>
                {renderTitle(card)}
                <Text style={authStyles.featureDescription}>
                  {card.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    // Desktop view
    return (
      <View style={authStyles.featuresContainerFullPage}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              authStyles.featureCardFullPage,
              card.isMain && authStyles.featureCardMiddle,
            ]}
          >
            <Image
              source={card.image}
              style={authStyles.featureCardBackground}
              resizeMode="cover"
            />
            <View style={authStyles.featureCardContent}>
              {renderTitle(card)}
              <Text style={authStyles.featureDescription}>
                {card.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
};

export default FeatureCards;
