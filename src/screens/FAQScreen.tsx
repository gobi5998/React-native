import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import BottomNavBar from '../components/BottomNavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchFAQs } from '../services/faqService';
import { FAQItem } from '../types/types';

type FAQScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'FAQ'>;
};

const FAQScreen: React.FC<FAQScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchFAQs();
      setFaqData(data);
    } catch (err) {
      setError('Failed to load FAQs. Please try again later.');
      console.error('Error loading FAQs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#8D9533" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadFAQs}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollView}>
        {faqData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => toggleExpand(index)}
          >
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={24}
                color="#8D9533"
              />
            </View>
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        </View>

        {renderContent()}
      </View>
      <BottomNavBar 
        activeScreen="Home" 
        isLoggedIn={isLoggedIn}
        onLoginPress={handleLoginPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingBottom: 76,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    padding: 16,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#8D9533',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FAQScreen; 