import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Dimensions,
} from "react-native";
import { PageLoaderProps, ProgressBarProps } from "@/interface/types";

const ProgressBar = memo(({ progress }: ProgressBarProps) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
});

ProgressBar.displayName = "ProgressBar";

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  onLoadingComplete,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [opacity] = useState(new Animated.Value(1));
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [pageReady, setPageReady] = useState<boolean>(false);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const calculateProgress = useCallback((prev: number): number => {
    if (prev < 50) {
      return Math.min(50, prev + Math.random() * 8);
    }
    if (prev < 80) {
      return prev + Math.random() * 4;
    }
    return Math.min(90, prev + Math.random() * 2);
  }, []);

  const handleComplete = useCallback((): void => {
    setIsComplete(true);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setTimeout(() => {
      setPageReady(true);
    }, 2000);

    timeout = setTimeout(() => {
      if (!pageReady) {
        setTimedOut(true);
        setPageReady(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  let progressTimer: NodeJS.Timeout;

  useEffect(() => {
    if (isLoading && !pageReady) {
      setProgress(0);
      progressTimer = setInterval(() => {
        setProgress((prevProgress) => calculateProgress(prevProgress));
      }, 50);
    } else {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
      setProgress(100);

      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        handleComplete();
      });
    }

    return () => {
      if (progressTimer) {
        clearInterval(progressTimer);
      }
    };
  }, [isLoading, pageReady, calculateProgress, handleComplete, opacity]);

  if (isComplete) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.loaderContent}>
        {timedOut && (
          <Text style={styles.loadingText}>Taking longer than expected...</Text>
        )}
        <ProgressBar progress={progress} />
      </View>
    </Animated.View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(26, 35, 65, 0.9)",
    zIndex: 9999,
  },
  loaderContent: {
    width: Math.min(300, windowWidth * 0.8),
    alignItems: "center",
  },
  progressBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00E096",
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
  },
});

export default memo(PageLoader);
