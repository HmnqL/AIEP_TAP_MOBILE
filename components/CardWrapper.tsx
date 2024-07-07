import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Card from '@/components/Card'; 

const CardWrapper: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState({
    totalPaidInvoices: 0,
    totalPendingInvoices: 0,
    numberOfInvoices: 0,
    numberOfCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.56.1:3000/api/cards'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setCardData({
          totalPaidInvoices: data.paid,
          totalPendingInvoices: data.pending,
          numberOfInvoices: data.totalinvoices,
          numberOfCustomers: data.totalcustomers,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching card data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card title="Cobrado" value={cardData.totalPaidInvoices} type="collected" />
      <Card title="Pendiente" value={cardData.totalPendingInvoices} type="pending" />
      <Card title="Total de Facturas" value={cardData.numberOfInvoices} type="invoices" />
      <Card title="Clientes" value={cardData.numberOfCustomers} type="customers" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default CardWrapper;
