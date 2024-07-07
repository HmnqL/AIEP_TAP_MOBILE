import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';


type CardProps = {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
};

const iconMap: Record<string, any> = {
  collected: BanknotesIcon, 
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

const Card: React.FC<CardProps> = ({ title, value, type }) => {
  const Icon = iconMap[type];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {Icon && <Image source={Icon} style={styles.icon} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default Card;
