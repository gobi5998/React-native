import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

// Import navigation types
import { StackNavigationProp } from '@react-navigation/stack';
// Correct the relative path to App.tsx
import { RootStackParamList } from '../../App';

// Placeholder for logo - replace with your actual logo path
// const logo = require('../../assets/image/flat.png'); // Adjust the path as needed
// Placeholder for Google icon - replace or use an icon library
// const googleIcon = require('../../assets/google-icon.png'); // Example path

// Define Props type for the screen including navigation
type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup' // Current screen name
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

// Add navigation prop to the component
const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(true); // State to toggle between Sign up and Log in
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Basic password validation checks (can be expanded)
  const isLengthValid = password.length >= 8;
  // A simple regex for at least one special character
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleGetStarted = () => {
    if (isSignup) {
      // Handle Sign up logic
      console.log('Signing up:', { name, email, password }); // Ensure state variables are in scope
      // Add navigation after successful signup if needed
      // navigation.navigate('PropertyList');
    } else {
      // Handle Log in logic
      console.log('Logging in:', { email, password }); // Ensure state variables are in scope
      // Navigate to PropertyList after successful login
      // TODO: Add actual login verification before navigating
      navigation.navigate('PropertyList');
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google Sign up logic
    console.log('Signing up with Google');
  };

  // toggleMode might not be needed if using navigateToLogin/Signup
  // const toggleMode = () => { ... };

  // These functions just toggle the view state within this screen
  const navigateToLogin = () => {
    setIsSignup(false);
    // Clear fields
    setName('');
    setEmail('');
    setPassword('');
  };

   const navigateToSignup = () => {
    setIsSignup(true);
    // Clear fields
    setName('');
    setEmail('');
    setPassword('');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}
          {/* Add Menu Icon if needed */}
          {/* <TouchableOpacity>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity> */}
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign up or Login</Text>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isSignup && styles.activeToggleButton]}
              // Use navigateToSignup for consistency, although setIsSignup(true) works
              onPress={navigateToSignup}
              disabled={isSignup}
            >
              <Text style={[styles.toggleText, isSignup && styles.activeToggleText]}>
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isSignup && styles.activeToggleButton]}
               // Use navigateToLogin for consistency
              onPress={navigateToLogin}
              disabled={!isSignup}
            >
              <Text style={[styles.toggleText, !isSignup && styles.activeToggleText]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          {isSignup && (
            <>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder={isSignup ? "Create a password" : "Enter your password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Password Requirements (Only show for Sign up) */}
          {isSignup && (
            <View style={styles.requirementsContainer}>
              <View style={styles.requirementItem}>
                <Text style={[styles.requirementText, isLengthValid && styles.validRequirement]}>
                  {isLengthValid ? '✓' : '•'} Must be at least 8 characters
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Text style={[styles.requirementText, hasSpecialChar && styles.validRequirement]}>
                  {hasSpecialChar ? '✓' : '•'} Must contain one special character
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>
              {isSignup ? 'Get started' : 'Log in'}
            </Text>
          </TouchableOpacity>

          {isSignup && (
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
              {/* <Image source={googleIcon} style={styles.googleIcon} /> */}
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
           )}

          {/* Footer Link */}
           <View style={styles.footer}>
            {isSignup ? (
              <>
                <Text style={styles.footerText}>Already have an account? </Text>
                {/* This TouchableOpacity calls navigateToLogin (changes state) */}
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.footerText}>Don't have an account? </Text>
                 {/* This TouchableOpacity calls navigateToSignup (changes state) */}
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Light grey background
  },
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10, // Adjust as needed for status bar height
    paddingBottom: 10,
    backgroundColor: '#FFF', // White header background
  },
  logo: {
    height: 40,
    width: 100, // Adjust width as needed
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#4FD1C5', // Teal gradient background (simplified)
    // To create a gradient, you might need react-native-linear-gradient
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // White text
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Slightly off-white content background
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15, // Overlap the title container slightly
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF', // Light grey background for toggle
    borderRadius: 8,
    marginBottom: 25,
    overflow: 'hidden', // Ensures border radius works with children
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#FFF', // White background for active tab
    borderRadius: 8, // Match container radius
    // Add shadow/elevation if needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleText: {
    fontSize: 16,
    color: '#6C757D', // Grey text for inactive tab
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#4FD1C5', // Teal text for active tab
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#495057', // Darker grey text
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CED4DA', // Light grey border
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  requirementsContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requirementText: {
    fontSize: 14,
    color: '#6C757D', // Grey text for requirements
  },
  validRequirement: {
    color: '#28A745', // Green text for valid requirements
  },
  primaryButton: {
    backgroundColor: '#4FD1C5', // Teal button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center', // Center content
    marginBottom: 25,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Add some space above the footer
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
  },
  footerLink: {
    fontSize: 14,
    color: '#4FD1C5', // Teal link color
    fontWeight: 'bold',
    marginLeft: 5, // Space between text and link
  },
});

export default SignupScreen; 