import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// API base URL - replace with your actual API endpoint
const API_URL = 'https://7dda-103-186-120-4.ngrok-free.app/api';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Basic password validation checks
  const isLengthValid = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === c_password;

  const validateForm = () => {
    setError('');
    
    if (isSignup && !name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (isSignup) {
      if (!isLengthValid || !hasSpecialChar) {
        setError('Password does not meet requirements');
        return false;
      }
      
      if (!c_password) {
        setError('Please confirm your password');
        return false;
      }
      
      if (!passwordsMatch) {
        setError('Passwords do not match');
        return false;
      }
    }
    
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          c_password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      Alert.alert('Success', 'Account created successfully!');
      // Navigate to login or directly to PropertyList
      setIsSignup(false);
    } catch (error) {
      setError('An error occurred during signup');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token or user data in secure storage
      // Example: await AsyncStorage.setItem('userToken', data.token);
      
      // Navigate to PropertyList
      navigation.navigate('PropertyList');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google Sign up logic
    console.log('Signing up with Google');
    // This would typically involve OAuth integration
  };

  const navigateToLogin = () => {
    setIsSignup(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const navigateToSignup = () => {
    setIsSignup(true);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign up or Login</Text>
        </View>

        <View style={styles.contentArea}>
          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isSignup && styles.activeToggleButton]}
              onPress={navigateToSignup}
              disabled={isSignup}
            >
              <Text style={[styles.toggleText, isSignup && styles.activeToggleText]}>
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isSignup && styles.activeToggleButton]}
              onPress={navigateToLogin}
              disabled={!isSignup}
            >
              <Text style={[styles.toggleText, !isSignup && styles.activeToggleText]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error message */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

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
                editable={!isLoading}
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
            editable={!isLoading}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder={isSignup ? "Create a password" : "Enter your password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          {/* Confirm Password Field (Only show for Sign up) */}
          {isSignup && (
            <>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                value={c_password}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </>
          )}

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
              {c_password.length > 0 && (
                <View style={styles.requirementItem}>
                  <Text style={[styles.requirementText, passwordsMatch && styles.validRequirement]}>
                    {passwordsMatch ? '✓' : '•'} Passwords must match
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <TouchableOpacity 
            style={[styles.primaryButton, isLoading && styles.disabledButton]} 
            onPress={handleGetStarted}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isSignup ? 'Get started' : 'Log in'}
              </Text>
            )}
          </TouchableOpacity>

          {isSignup && (
            <TouchableOpacity 
              style={[styles.googleButton, isLoading && styles.disabledButton]} 
              onPress={handleGoogleSignup}
              disabled={isLoading}
            >
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          )}

          {/* Footer Link */}
          <View style={styles.footer}>
            {isSignup ? (
              <>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin} disabled={isLoading}>
                  <Text style={styles.footerLink}>Log in</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToSignup} disabled={isLoading}>
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
    backgroundColor: '#F4F4F4',
  },
  container: {
    flexGrow: 1,
  },
  titleContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#8D9533',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginBottom: 25,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  toggleText: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#8D9533',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FFE8E8',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CED4DA',
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
    color: '#6C757D',
  },
  validRequirement: {
    color: '#28A745',
  },
  primaryButton: {
    backgroundColor: '#8D9533',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  disabledButton: {
    opacity: 0.7,
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
    justifyContent: 'center',
    marginBottom: 25,
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
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
  },
  footerLink: {
    fontSize: 14,
    color: '#8D9533',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen; 
