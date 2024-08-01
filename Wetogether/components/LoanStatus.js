import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function LoanStatus() {
    const [amount, setAmount] = useState('50000');
    const [rate, setRate] = useState('7.5');
    const [duration, setDuration] = useState('24');
    const [bank, setBank] = useState('XYZ Bank');
    const [account, setAccount] = useState('1234567890');
    const [ifsc, setIfsc] = useState('XYZB0001234');
    const [branch, setBranch] = useState('Downtown');
    const [pay, setPay] = useState('2200');
    const [loanPaid, setLoanPaid] = useState(true);

    let navigation = useNavigation();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
        return true;
    };

    if (amount != 0) {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', marginLeft: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#1A1110', marginTop: 30 }}>Status : </Text>
                    {
                        loanPaid ? <Text style={{ fontFamily: 'Poppins-Normal', fontSize: 20, color: '#38E038', marginTop: 30, marginLeft: 10 }}>Loan Paid</Text> : <Text style={{ fontFamily: 'Poppins-Normal', fontSize: 20, color: 'red', marginTop: 30, marginLeft: 20 }}>Loan Not Paid</Text>
                    }
                </View>
                <TouchableOpacity style={{ elevation: 10, shadowOffset: 3, backgroundColor: 'white', borderRadius: 20, marginLeft: 20, marginTop: 30, width: width - 40, height: height - 200 }} disabled>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', marginTop: 20, marginLeft: 20, color: '#1A1110' }}>Simple Credit</Text>
                            <Text style={{ fontSize: 13, fontFamily: 'Poppins-Normal', marginTop: 5, marginLeft: 20, color: '#808080' }}>Cash Loan</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 5, marginLeft: 20, color: '#1A1110' }}>{bank}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1.2, width: width - 40, backgroundColor: '#d3d3d3', marginTop: 20, borderRadius: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Loan Amount</Text>
                            <Text style={{ fontSize: 25, fontFamily: 'Poppins-Bold', marginTop: 2, marginLeft: 20, color: 'black' }}>₹ {amount}</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Interest Rate</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', marginTop: 2, marginLeft: 20, color: 'black' }}>{rate}%</Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginRight: 30 }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Monthly Payment</Text>
                            <Text style={{ fontSize: 25, fontFamily: 'Poppins-Bold', marginTop: 2, marginLeft: 20, color: 'black' }}>₹ {pay} </Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Duration</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', marginTop: 2, marginLeft: 20, color: 'black' }}>{duration} months</Text>
                        </View>
                    </View>
                    <View style={{ height: 1.2, width: width - 40, backgroundColor: '#d3d3d3', marginTop: 20, borderRadius: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', marginRight: 30 }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Account Number</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Normal', marginTop: 2, marginLeft: 20, color: 'black' }}>{account}</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>IFSC code</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Normal', marginTop: 2, marginLeft: 20, color: 'black' }}>{ifsc}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginRight: 50 ,marginBottom: 75}}>
                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Normal', marginTop: 20, marginLeft: 20, color: 'grey' }}>Branch</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Normal', marginTop: 2, marginLeft: 20, color: 'black' }}>{branch}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
                <Text style={{ fontFamily: 'Poppins-Normal', fontSize: 20, color: 'black' }}>No Loans Applied</Text>
            </View>
        );
    }
}
